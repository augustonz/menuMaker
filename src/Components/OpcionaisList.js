import React,{useState,useEffect} from 'react';
import {Row,Col,Tooltip,Button} from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';

import NewOptionModal from './NewOptionModal';
import EditOptionModal from './EditOptionModal';

const OpcionaisList = () => {

    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);
    const [editItem,setEditItem]=useState({});
    const [opcoes,setOpcoes] = useState([]);

    function refreshList() {
        axios.get('https://augustomenumaker.herokuapp.com/opcao').then(res=>{
            setOpcoes(res.data);
        })
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        refreshList();
    },[])

    const newOption = () => {
        setModalNewVisibility(true);
    }

    const handleNewOk = (values) => {
        if (values.req===undefined){
            values.req=false;
        }
        let option = {
            title:values.title,
            req:values.req,
            max:Number(values.max),
            possibil:values.possibil
        }
        axios.post('https://augustomenumaker.herokuapp.com/opcao/add',option).then(res=>{
            refreshList();
        })
        .catch(err=>console.log(err));
        //myState.newOption(option);
        setModalNewVisibility(false);
    }

    const editOption = (opcao) => {
        setEditItem(opcao);
        setModalEditVisibility(true);
    }

    const handleEditOk = (values) => {

        if (values.req===undefined){
            values.req=false;
        }
        let option = {
            title:values.title,
            req:values.req,
            max:Number(values.max),
            possibil:values.possibil
        }
        console.log(values);
        axios.post('https://augustomenumaker.herokuapp.com/opcao/update/'+editItem._id,option).then(res=>{
            refreshList();
        })
        .catch(err=>console.log(err));
        //myState.editOption(option);
        setModalEditVisibility(false);
    }

    const delOption = (id) => {
        axios.delete('https://augustomenumaker.herokuapp.com/opcao/'+id).then(res=>{
        refreshList();
        })
        .catch(err=>console.log(err));
        //myState.delOption(id);
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

            {opcoes.length>0?
            <Row>
                {opcoes.map((item)=>(
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
                                <Tooltip title='excluir' color='white'><Button shape='circle' danger onClick={()=>delOption(item._id)} icon={<DeleteOutlined />}/></Tooltip>
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