import React from 'react';
import {useHistory} from 'react-router-dom';

import {Layout,Col,Row} from 'antd';

import {ArrowLeftOutlined} from '@ant-design/icons';


const {Header} = Layout;

const GoBack = (props) => {

    const history=useHistory();
    const handleClick = (event) =>{
        history.goBack();
    }


    return(
        <Layout>
            <Header style={{backgroundColor:'#47b3f7',padding:'0px'}}>
                <ArrowLeftOutlined style={{position:'absolute', top:'25px',left:'20px'}} onClick={handleClick}/>
                <Row style={{height:'64px',justifyContent:'center',alignItems:'center'}}>
                    <Col>
                       <h4 style={{fontWeight:'bold',lineHeight:'30px'}}>{props.name}</h4>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}

export default GoBack;