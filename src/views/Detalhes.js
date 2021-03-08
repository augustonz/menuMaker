import React,{useEffect,useState,useContext} from 'react';
import axios from 'axios';
import {Layout,Row,Col,Divider,Button, Affix,Checkbox,message} from 'antd';
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import {useParams,useHistory} from 'react-router-dom';
import GoBack from '../Components/GoBack';
import Opcoes from '../Components/Opcoes';
import {MenuContext} from '../contexts/ThemeContext';
const {Content}=Layout


const Detalhes = () =>{

    const myState=useContext(MenuContext);
    const myHistory=useHistory();
    const {id} = useParams();
    const [produto,setProduto] = useState({id:1,name:'',desc:'',imgSrc:'/placeholder.png',prices:[{info:'',val:0}],options:[1]});
    const [counter,setCounter] = useState(1);
    const [price,setPrice] = useState(undefined);
    const [options,setOptions] = useState([]);

    useEffect(async ()=>{
        const response = await axios.get("https://augustomenumaker.herokuapp.com/produto/"+id);
        setProduto(response.data);
    },[]);

    function getOptions(lista) {
        let newArr=[];
        for (let i=0;i<lista.length;i++){
            if (lista[i]!==[]){
                newArr.push(JSON.parse(lista[i]));
            }
        }
        setOptions(newArr);
    }

    function addCarrinho() {
        //{quant:1,val:0,productId:1,options:[{name:'',add:0}]}
        if (produto.prices.length>1 && price===undefined){
            message.error('Por favor selecione um preço.');
        } else {
            var unit={
                id:0,
                product:produto,
                options:options,
                val:produto.prices.length===1?produto.prices[0].val:price,
                quant:counter
            }
            console.log(unit);
            myState.addProdutoCarrinho(unit);
            myHistory.goBack();
        }
        
    }

    return(
        <>
            <GoBack name='Detalhes do produto'/>
            <Layout>
                <Content style={{backgroundColor:'white',padding:'0 7px'}}>
                    <Row style={{justifyContent:'center'}}>
                        <Col>
                            <img src={produto.imgSrc} style={{width:'auto', height:'20vh',margin:'20px 10px'}} alt='imagem do produto' />
                        </Col>
                    </Row>

                    <h1>{produto.name}</h1>
                    <p style={{color:'GrayText'}}>{produto.desc}</p>
                    {produto.prices.length>1?<h3 style={{display:'inline'}}>A partir de </h3>:null} <h1 style={{display:'inline'}}>R${produto.prices[0].val.toFixed(2).toString().replace('.',',')}</h1>
                    <Divider style={{borderColor:'#999999'}} orientation='left'>Opções</Divider>
                    {produto.prices.length>1?
                    <>
                        <Row align='middle'>
                            <Col span='12'>
                                <h1>Escolha 1 opção:</h1>
                            </Col>
                            <Col span='8' offset='4'>
                                <h3>(Obrigatório)</h3>
                            </Col>
                        </Row>
                        
                        <Checkbox.Group style={{width:'100%'}} value={price}>
                            {produto.prices.map((item)=>(
                                <Row>
                                    <Col span='10'>
                                        <h3>{item.info}</h3>
                                    </Col>
                                    <Col span='10'>
                                        <h3 style={{fontWeight:'bold',marginLeft:'5px'}} className='color'>R${String(item.val.toFixed(2)).replace('.',',')}</h3>
                                    </Col>
                                    <Col>
                                        <Checkbox value={item.val} onClick={e=>setPrice(e.target.value)}/>
                                    </Col>
                                </Row>
                            ))}
                        </Checkbox.Group>
                    </>
                    :null}
                    

                    <Opcoes opcoesIds={produto.options} onOk={getOptions}/>

                    <Affix offsetBottom={0}>
                        <Row justify='space-around' style={{paddingTop:'30px',paddingBottom:'30px',backgroundColor:'whitesmoke'}}>
                            <Col>
                                <Button onClick={()=>setCounter(counter>1?counter-1:counter)}><LeftOutlined/></Button>
                            </Col>
                            <Col>
                                <h1>{counter}</h1>
                            </Col>
                            <Col>
                                <Button onClick={()=>setCounter(counter+1)}><RightOutlined/></Button>
                            </Col>
                            <Col>
                                <Button onClick={()=>addCarrinho()} style={{backgroundColor:'#47b3f7',fontWeight:'bolder'}} size='large'>Adicionar ao carrinho</Button>
                            </Col>
                        </Row>
                    </Affix>
                    
                </Content>
            </Layout>
        </>
        
    )
}

export default Detalhes