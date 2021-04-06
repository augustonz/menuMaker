import React,{useContext, useEffect, useState} from 'react';
import {MenuContext} from '../contexts/ThemeContext';
import {Layout,Row,Col,Divider,Spin,Image} from 'antd';
import {ShopOutlined} from '@ant-design/icons';
import moment from 'moment';

import GoBack from '../Components/GoBack';
const {Header,Content} = Layout;

const Sobre = () => {

    const myState = useContext(MenuContext);
    const [info,setInfo] = useState(undefined);
    useEffect(()=>{
        async function init() {
            setInfo(await myState.getLojaInfo());
        }
        init();
    },[myState]);

    const getHora = (string) => {
        return string.slice(11,16);
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
                    <GoBack name='Sobre a loja'/>
                </Header>
                
                <Content style={{padding:'20px'}}>
                    {info===undefined?<div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'72vh',padding:'35vh 0'}}><Spin size='large'/><br/><h2>Carregando...</h2></div>:
                        <>  
                            <Row justify='center' style={{color:'#47b3f7'}}>
                                <Col span='2'>
                                    <ShopOutlined style={{fontSize:'30px'}}/>
                                </Col>
                                <Col offset='1'>
                                    <h2 style={{color:'#47b3f7'}}>
                                        {info.nome}
                                    </h2>
                                </Col>
                            </Row>
                            <Divider/>
                            <h3 style={{color:'#47b3f7'}}>Sobre</h3>
                            <p>{info.sobre}</p>
                            <Divider/>
                            <h3 style={{color:'#47b3f7'}}>Horário de funcionamento: </h3>
                            <p>De {info.horario[0]} a {info.horario[1]}, das {moment(info.horario[2]).format("HH:mm")}h às {moment(info.horario[3]).format("HH:mm")}h</p>
                            <Divider/>
                            <h3 style={{color:'#47b3f7'}}>Localização</h3>
                            <p>{info.endereco}</p>
                        </>
                    }
                </Content>
            </Layout>
        </>
    ) 
}

export default Sobre;
