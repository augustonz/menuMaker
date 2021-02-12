import React,{useContext,useState} from 'react';
import {List,Button,Tooltip,Modal,Row,Col} from 'antd';
import {MenuContext} from '../contexts/ThemeContext';
import {DeleteOutlined,PlusOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

import NewGroupModal from './NewGroupModal';
import EditGroupModal from './EditGroupModal';
const {confirm} = Modal;

const GroupsList= ({groupSetter})=>{

    const myState=useContext(MenuContext);
    const [editItem,setEditItem]=useState({});
    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);

    const newGroup = () =>{
        setModalNewVisibility(true);
    }

    const handleNewOk = (values) =>{
        myState.newGroup(values.nome);
        setModalNewVisibility(false);
    }

    const editGroup = (item) =>{
        setEditItem(item);
        setModalEditVisibility(true);
    }

    const handleEditOk = (values) =>{
        myState.editGroup(editItem.id,values.nome);
        setModalEditVisibility(false);
    }

    const delGroup = (id) =>{
        confirm({
            title: 'Você quer excluir esse grupo?',
            icon: <ExclamationCircleOutlined />,
            content: 'Todos os produtos do grupo serão excluidos também.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            closable:true,
            onOk() {
              myState.deleteGroup(id);
            },
            onCancel() {
            },
          });
    }

    return(
        <>
            <NewGroupModal
            visible={isModalNewVisible} 
            onOk={handleNewOk} 
            onCancel={() => {setModalNewVisibility(false)}}>
            </NewGroupModal>

            <EditGroupModal
            initialName={editItem.name}
            visible={isModalEditVisible} 
            onOk={handleEditOk} 
            onCancel={() => {setModalEditVisibility(false)}}>
            </EditGroupModal>

            <Row style={{marginBottom:10,justifyContent:'center'}}>
                <Col>
                    <Tooltip title='criar' color='white'><Button className='color' shape='circle' type='primary' onClick={newGroup} icon={<PlusOutlined />}/></Tooltip>
                </Col>
                <Col offset='1'><h1 className='color'>Grupos</h1></Col>
            </Row>

            {myState.state.cardapio.grupos.length===0?<h1 style={{padding:20}}>Crie um grupo de produtos utilizando o botão acima</h1>:
            <List
            itemLayout='horizontal' 
            dataSource={myState.state.cardapio.grupos}
            renderItem={item=>(
                <List.Item onClick={()=>groupSetter(item)} style={{backgroundColor:'white'}} key={item.id}  
                actions={[<Tooltip title='editar' color='white'><Button shape='circle' onClick={event=>{event.stopPropagation();event.nativeEvent.stopImmediatePropagation();editGroup(item)}} icon={<EditOutlined />}/></Tooltip>,
                <Tooltip title='excluir' color='white'><Button shape='circle' danger onClick={event=>{event.stopPropagation();event.nativeEvent.stopImmediatePropagation();delGroup(item.id)}} icon={<DeleteOutlined />}/></Tooltip>]}>
                    <List.Item.Meta title={item.name} description={'Produtos: '+item.products.length} />
                </List.Item>
            )} />}
        </>
    );
}

export default GroupsList;