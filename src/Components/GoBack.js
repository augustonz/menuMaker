import React from 'react';
import {useHistory} from 'react-router-dom';
import {Col,Row} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const GoBack = (props) => {

    const history=useHistory();
    const handleClick = (event) =>{
        history.goBack();
    }

    return(
        <>
            <ArrowLeftOutlined style={{position:'absolute', top:'25px',left:'20px'}} onClick={handleClick}/>
            <Row style={{height:'30px',justifyContent:'center',alignItems:'center'}}>
                <Col>
                    <h4 style={{fontWeight:'bold',lineHeight:'30px'}}>{props.name}</h4>
                </Col>
            </Row>
        </>
    )
}

export default GoBack;