import React,{useContext, useEffect,useState} from 'react';
import {Layout,Row,Col,Divider,Button} from 'antd';
import {useParams} from 'react-router-dom';
import GoBack from '../Components/GoBack';
import Opcoes from '../Components/Opcoes';
import {MenuContext} from '../contexts/ThemeContext';
const {Content}=Layout


const Detalhes = () =>{

    const myState=useContext(MenuContext);
    const {id} = useParams();
    const [produto,setProduto] = useState({id:1,name:'Produto 1',desc:'Descrição',imgSrc:'/placeholder.png',prices:[{info:'Preço: ',val:10.50}],options:[1]});
    useEffect(()=>{
        setProduto(myState.findProductById(parseInt(id)));
    },[])
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

                    <Opcoes opcoesIds={produto.options}/>
                    <Row justify='space-around' style={{paddingTop:'30px',paddingBottom:'30px'}}>
                        <Col>
                            <Button style={{backgroundColor:'#47b3f7',fontWeight:'bolder'}} size='large'>Adicionar ao carrinho</Button>
                        </Col>
                    </Row>
                    
                </Content>
            </Layout>
        </>
        
    )
}

export default Detalhes