import React,{useEffect,useState,useContext} from 'react';
import {Layout,Row,Col,Divider,Button, Affix,Checkbox,message,Spin,Image} from 'antd';
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import {useParams,useHistory} from 'react-router-dom';
import GoBack from '../Components/GoBack';
import Opcoes from '../Components/Opcoes';
import {MenuContext} from '../contexts/ThemeContext';
const {Content,Header}=Layout;

const Detalhes = () =>{

    const myContext=useContext(MenuContext);
    const myHistory=useHistory();
    const {id} = useParams();
    const [loading,setLoading] = useState(true);
    const [produto,setProduto] = useState({});
    const [counter,setCounter] = useState(1);
    const [price,setPrice] = useState(undefined);
    const [options,setOptions] = useState([]);

    useEffect(async ()=>{
        async function init() {
            setProduto(await myContext.getProduto(id));
            setLoading(false);
        }
        init();
    },[myContext,id]);

    function getOptions(lista) {
        let newArr=[];
        for (let i=0;i<lista.length;i++){
            if (lista[i]!==[]){
                newArr.push(JSON.parse(lista[i]));
            }
        }
        setOptions(newArr);
    }

    function optionsError(){
        var error = false;
        options.forEach((val,idx)=>{
            if (val.length===0 && produto.options[idx].req===true){
                error=true;
                return;
            }
        });
        return error;
    }

    function addCarrinho() {
        //{quant:1,val:0,productId:1,options:[{name:'',add:0}]}
        if (produto.prices.length>1 && price===undefined){
            message.error('Por favor selecione um preço.');
        } else if (optionsError()) {
            message.error('Por favor selecione as opções obrigatórias.');
        } else {
            var unit={
                id:0,
                product:produto,
                options:options,
                val:produto.prices.length===1?produto.prices[0]:price,
                quant:counter
            }
            console.log(unit);
            myContext.addProdutoCarrinho(unit);
            myHistory.goBack();
        }
        
    }

    return(
        <>
            <Layout>
                <Header className='pageHeader'>
                    <Row style={{height:'15vh',justifyContent:'center'}}>
                        <Col style={{height:'15vh'}}>
                            <Image src='/logo.png' width='90px' style={{maxHeight:'15vh'}} preview={false}/>
                        </Col>
                    </Row>
                    <GoBack name='Detalhes do produto'/>
                </Header>
            {loading ? <div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'80vh',padding:'35vh 0'}}><Spin size='large'/></div>:
                <>
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
                            
                            <Checkbox.Group style={{width:'100%'}} value={JSON.stringify(price)}>
                                {produto.prices.map((item)=>(
                                    <Row>
                                        <Col span='10'>
                                            <h3>{item.info}</h3>
                                        </Col>
                                        <Col span='10'>
                                            <h3 style={{fontWeight:'bold',marginLeft:'5px'}} className='color'>R${String(item.val.toFixed(2)).replace('.',',')}</h3>
                                        </Col>
                                        <Col>
                                            <Checkbox value={JSON.stringify(item)} onClick={e=>setPrice(JSON.parse(e.target.value))}/>
                                        </Col>
                                    </Row>
                                ))}
                            </Checkbox.Group>
                        </>
                        :null}
                        

                        <Opcoes opcoes={produto.options} onOk={getOptions}/>

                        <Affix offsetBottom={0}>
                            <Row justify='space-around' style={{backgroundColor:'whitesmoke',height:'20px'}}>
                                <Col offset='2' span='2'>
                                    <p>Quantidade:</p>
                                </Col>
                                <Col span='18'> </Col>
                            </Row>
                            <Row justify='space-around' style={{paddingBottom:'10px',backgroundColor:'whitesmoke'}}>
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
                </>}
            </Layout>
        </>
        
    )
}

export default Detalhes