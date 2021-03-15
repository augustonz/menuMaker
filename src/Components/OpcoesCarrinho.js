import React from 'react'
import {Row,Col} from 'antd';

const OpcoesCarrinho = ({opcoes}) => {

    return(
        <>
            {opcoes.map((val)=>(
            typeof(val[0])==='string'?
                <>
                    <Row style={{width:'90%'}}>
                        <Col span='19'>
                            <p>{val[0]}</p>
                        </Col>
                        <Col span='5'>
                            
                        </Col>
                    </Row>
                </>
            :val.map((options)=>(
                <>
                    <Row style={{width:'90%'}}>
                        <Col span='19'>
                            <p>{options[0]}</p>
                        </Col>
                        <Col span='5'>
                           
                        </Col>
                    </Row>
                </>
            ))
            ))}
        </>
    )
}

export default OpcoesCarrinho;