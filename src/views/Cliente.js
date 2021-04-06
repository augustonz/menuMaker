import React,{useContext,useEffect,useState} from 'react';

import {useHistory} from 'react-router-dom';
import {Row,Col,Layout,Image,Button, Affix,Badge} from 'antd';
import {RightOutlined, ShoppingCartOutlined} from '@ant-design/icons';

import {MenuContext} from '../contexts/ThemeContext';
import Menu from '../Components/Menu';
import GroupAnchor from '../Components/GroupAnchor';
import LojaInfo from '../Components/LojaInfo';
const {Header,Content} = Layout;

const Cliente = () => {

    const myContext = useContext(MenuContext);
    const [menu,setMenu] = useState([]);
    const history=useHistory();
    const handleClick = (event) =>{
        history.push('/sobre');
    }
    useEffect(()=>{
        async function init() {
            setMenu(await myContext.getMenu());
        } 
        init();  
    },[]);
    
    return(
        <>
            <Layout>
                <Header className='pageHeader'>
                    <Row style={{height:'15vh',justifyContent:'center'}}>
                        <Col style={{height:'15vh'}}>
                            <Image src='/logo.png' width='90px' style={{maxHeight:'15vh'}} preview={false}/>
                        </Col>
                    </Row>
                    <Row style={{height:'5vh',lineHeight:'5vh',justifyContent:'center'}} align='bottom'>
                        <Col style={{height:'5vh'}} onClick={handleClick}>
                            <Button type='text' style={{fontWeight:'bolder'}}> Conheça a loja! </Button>
                        </Col>
                        <Col  onClick={handleClick} style={{height:'5vh',verticalAlign:'middle',lineHeight:'5vh'}} >
                            <RightOutlined  />
                        </Col>
                    </Row> 
                </Header>
                
                <Content style={{backgroundColor:'#cccccc'}}>
                    {/* verificar preço de entrega (outra tela ou modal?)
                    */}
                    <LojaInfo nome='Mr. Mix Cráteus' desc='Fechado'/>
                    <Affix offsetTop={0}>
                        <GroupAnchor GroupList={menu}/>
                    </Affix>   
                    <Menu MenuList={menu}/>
                    <Affix offsetBottom={0}>
                        <Row justify='start' align='middle' style={{backgroundColor:'#333333',color:'white',width:'100vw',height:'8vh'}}
                        onClick={()=>history.push('/carrinho')}>
                            <Col offset='1'  style={{paddingTop:'1vh'}}>
                                <Badge count={myContext.state.carrinho.length} showZero={true} size='small'>
                                    <ShoppingCartOutlined style={{fontSize:'4vh',color:'white'}}/>
                                </Badge> 
                            </Col>
                            <Col offset='4'>
                                <h1 style={{color:'white',lineHeight:'8vh',margin:'0'}}>Meu Carrinho</h1>
                            </Col>
                        </Row>
                    </Affix>
                </Content>
            </Layout>
        </>
    ) 
}

export default Cliente;
