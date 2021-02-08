import React,{useContext,useState} from 'react';
import {Row,Col,Tooltip,Button,List} from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';

import NewOptionModal from './NewOptionModal';
import EditOptionModal from './EditOptionModal';

import {MenuContext} from '../contexts/ThemeContext'
const OpcionaisList = () => {
    
    const myState=useContext(MenuContext);
    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);
    const [editItem,setEditItem]=useState({});
    const newOption = () => {
        setModalNewVisibility(true);
    }

    const handleNewOk = (values) => {
        console.log(values);
        if (values.req===undefined){
            values.req=false;
        }
        let option = {
            id:0,
            title:values.title,
            req:values.req,
            max:Number(values.max),
            possibil:values.possibil
        }
        myState.newOption(option);
        setModalNewVisibility(false);
    }

    const editOption = (option) => {
        setEditItem(option);
        setModalEditVisibility(true);
    }

    const handleEditOk = (values) => {
        console.log(values);
        if (values.req===undefined){
            values.req=false;
        }
        let option = {
            id:editItem.id,
            title:values.title,
            req:values.req,
            max:Number(values.max),
            possibil:values.possibil
        }
        myState.editOption(option);
        setModalEditVisibility(false);
    }

    const delOption = (id) => {
        myState.delOption(id);
    }

    return (
        <>
            <NewOptionModal
            visible={isModalNewVisible} 
            onOk={handleNewOk} 
            onCancel={() => {setModalNewVisibility(false)}}/>

            <EditOptionModal
            initialValues={editItem}
            visible={isModalEditVisible} 
            onOk={handleEditOk} 
            onCancel={() => {setModalEditVisibility(false)}}/>

            <Row justify='center'>
                <Col style={{marginRight:'10px'}}>
                    <Tooltip title='criar' color='white'><Button className='color' shape='circle' type='primary' onClick={newOption} icon={<PlusOutlined />}/></Tooltip>
                </Col>
                <Col><h1>Opcionais</h1></Col>
            </Row>

            {myState.state.cardapio.options.length>0?
            <Row>
                {myState.state.cardapio.options.map((item)=>(
                    <Col span='12' style={{paddingBottom:'30px'}}>
                        <Row>
                            <Col>
                                <h4 style={{marginBottom:'0px',display:'inline'}}>{item.title}</h4> {item.req?<h4 style={{marginBottom:'0px',display:'inline'}}> (Obrigatório)</h4>:null}
                                <p>Número máximo de opções escolhidas: {item.max}</p>
                                {item.possibil.map((price,index)=>(
                                    <>
                                        <p style={{margin:'0px'}}>{price.name}:<span style={{fontWeight:'bold',marginLeft:'5px'}} className='color'>+R${String(price.add.toFixed(2)).replace('.',',')}</span></p> 
                                    </>
                                ))}
                            </Col>
                            <Col style={{paddingTop:'15px',paddingLeft:'15px'}}>
                                <Tooltip title='editar' color='white'><Button style={{marginRight:15}} shape='circle' onClick={()=>editOption(item)} icon={<EditOutlined />}/></Tooltip>
                                <Tooltip title='excluir' color='white'><Button shape='circle' danger onClick={()=>delOption(item.id)} icon={<DeleteOutlined />}/></Tooltip>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
            :<h3>Clique no botão acima para criar opções para os produtos</h3>}
        </>
    );
}

export default OpcionaisList;