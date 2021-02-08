import React,{useContext} from 'react';

import {useHistory} from 'react-router-dom';
import {Row,Col,Layout,Image,Button, Affix} from 'antd';
import {RightOutlined} from '@ant-design/icons';

import {MenuContext} from '../contexts/ThemeContext';
import Menu from '../Components/Menu';
const {Header,Content} = Layout;

const Cliente = () => {

    const myState = useContext(MenuContext);

    const history=useHistory();
    const handleClick = (event) =>{
        history.push('/sobre');
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
                    {/*
                    Informação basica Fechado ou nao
                    verificar preço de entrega (outra tela ou modal?)
                    */}
                    <Menu/>
                </Content>
            </Layout>
        </>
    ) 
}

export default Cliente;
