import React,{useState,useEffect} from 'react';
import {List,Button,Tooltip,Modal,Row,Col} from 'antd';
import {DeleteOutlined,PlusOutlined,EditOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import axios from 'axios';

import NewGroupModal from './NewGroupModal';
import EditGroupModal from './EditGroupModal';
const {confirm} = Modal;

const GroupsList= ({groupSetter,list,refreshList})=>{

    const [editItem,setEditItem]=useState({});
    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);

    useEffect(()=>{
        refreshList();
      },[]);
      
    const newGroup = () =>{
        setModalNewVisibility(true);
    }

    const handleNewOk = (values) =>{
        values.products=[];
        axios.post('https://augustomenumaker.herokuapp.com/grupo/add',values).then(res=>refreshList());
        //myState.newGroup(values.name);
        setModalNewVisibility(false);
    }

    const editGroup = (item) =>{
        setEditItem(item);
        setModalEditVisibility(true);
    }

    const handleEditOk = (values) =>{
        values.products=editItem.products;
        
        axios.post('https://augustomenumaker.herokuapp.com/grupo/update/'+values._id,values).then(res=>{
            console.log(res);
            refreshList()})
            .catch(err=>console.log(err));
        //myState.editGroup(editItem.id,values.nome);
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
                axios.delete('https://augustomenumaker.herokuapp.com/grupo/'+id).then(res=>{
                    refreshList()})
                .catch(err=>console.log(err))
                
                //myState.deleteGroup(id);
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
            initialValues={editItem}
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

            {list.length===0?<h1 style={{padding:20}}>Crie um grupo de produtos utilizando o botão acima</h1>:
            <List
            itemLayout='horizontal' 
            dataSource={list}
            renderItem={item=>(
                <List.Item onClick={()=>{groupSetter(item);}} style={{backgroundColor:'white'}} key={item.id}  
                actions={[<Tooltip title='editar' color='white'><Button shape='circle' onClick={event=>{event.stopPropagation();event.nativeEvent.stopImmediatePropagation();editGroup(item)}} icon={<EditOutlined />}/></Tooltip>,
                <Tooltip title='excluir' color='white'><Button shape='circle' danger onClick={event=>{event.stopPropagation();event.nativeEvent.stopImmediatePropagation();delGroup(item._id)}} icon={<DeleteOutlined />}/></Tooltip>]}>
                    <List.Item.Meta title={item.name} description={'Produtos: '+item.products.length} />
                </List.Item>
            )} />}
        </>
    );
}

export default GroupsList;