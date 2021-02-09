import React,{useContext} from 'react';
import {Row,Col,Button} from 'antd'
import GoBack from '../Components/GoBack';
import Carrinho from '../Components/Carrinho';
import {MenuContext} from '../contexts/ThemeContext';


const Pedido = () => {

    const myState=useContext(MenuContext);
    return(
        <>
            <GoBack name='Meu pedido'/>
            <Carrinho/>

            <Row justify='center'>
                <Col>
                    <Button onClick={()=>myState.removeProdutoCarrinho()}>Deletar item</Button>
                </Col>
            </Row>
        </>
    )
}

export default Pedido;