import React,{useContext} from 'react';

import {MenuContext} from '../contexts/ThemeContext';
import {Row,Col,Layout,Image,Button} from 'antd';

import GoBack from '../Components/GoBack';

const {Header,Content} = Layout;

const Sobre = () => {

    const myState = useContext(MenuContext);

    return(
        <>
            <GoBack name='Sobre a loja'/>
            <Layout>
                <Content>
                    {/*
                    Informação basica Fechado ou nao
                    verificar preço de entrega (outra tela ou modal?)
                    menu com lista de grupos para clicar
                    lista de produtos separados por grupo
                    */}
                </Content>
            </Layout>
        </>
    ) 
}

export default Sobre;
