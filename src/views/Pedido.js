import React,{useContext} from 'react';
import {Row,Col,Button,Divider} from 'antd'
import GoBack from '../Components/GoBack';
import Carrinho from '../Components/Carrinho';
import {MenuContext} from '../contexts/ThemeContext';


const Pedido = () => {

    const myState=useContext(MenuContext);
    return(
        <>
            <GoBack name='Meu pedido'/>

            {myState.state.carrinho.length>0?<Carrinho/>:<p>Seu carrinho está vazio no momento, adicione algum produto!</p>}

            
            <Row justify='center'>
                <Col>
                    <Button size='large' style={{backgroundColor:"#47b3f7",color:"white"}}>Finalizar pedido</Button>
                </Col>
            </Row>
            
            
        </>
    )
}

export default Pedido;