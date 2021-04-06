import React from 'react';
import {Row,Col,Icon} from 'antd';
import {ShopOutlined} from '@ant-design/icons';


const LojaInfo = ({nome,desc}) => {

    return(
        <>
            <Row>
                <Col>
                    <ShopOutlined />
                </Col>
                <Col>
                    {nome}
                </Col>
                <Col>
                    {desc}
                </Col>
            </Row>
        </>
    )
}

export default LojaInfo;