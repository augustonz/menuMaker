import React from 'react';
import {Row,Col,Icon,Button} from 'antd';
import {ShopOutlined} from '@ant-design/icons';



const LojaInfo = ({nome,desc}) => {

    const atual = new Date();

    if (atual.getHours()>=16 && atual.getHours()<22){
        var status = "Aberto";
    } else {
        var status = "Fechado";
    }

    return(
        <>
            <Row align='middle' style={{backgroundColor:"#333333",padding:'10px 10px'}}>
                <Col offset='1'>
                    <ShopOutlined style={{fontSize:'22px',color:'white'}}/>
                </Col>
                <Col offset='1' style={{lineHeight:'28px'}}>
                    <h3 style={{lineHeight:'28px' ,color:'white'}}>{nome}</h3>
                </Col>
                <Col offset='3'>
                    {status==="Fechado"?<Button style={{backgroundColor:"red",color:'white',margin:'0 20px'}}>Fechado</Button>:<Button style={{backgroundColor:"green",color:'white',margin:'0 20px'}}>Aberto</Button>}
                </Col>
            </Row>
        </>
    )
}

export default LojaInfo;