import React,{useState,useContext} from 'react';
import {Row,Col,Tooltip,Button,Modal} from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import NewOptionModal from './NewOptionModal';
import EditOptionModal from './EditOptionModal';
import { MenuContext } from '../contexts/ThemeContext';
const {confirm} = Modal;

const OpcionaisList = ({opcoes,loadingSetter,refreshOpcoesList}) => {

    const myContext=useContext(MenuContext);
    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);
    const [editItem,setEditItem]=useState({});

    const newOption = () => {
        setModalNewVisibility(true);
    }

    const handleNewOk = async(values) => {
        if (values.req===undefined){
            values.req=false;
        }
        let option = {
            title:values.title,
            req:values.req,
            max:Number(values.max),
            possibil:values.possibil
        }
        setModalNewVisibility(false);
        loadingSetter(true);
        await myContext.createOption(option);
        refreshOpcoesList();
    }

    const editOption = (opcao) => {
        setEditItem(opcao);
        setModalEditVisibility(true);
    }

    const handleEditOk = async(values) => {

        if (values.req===undefined){
            values.req=false;
        }
        let option = {
            _id:values._id,
            title:values.title,
            req:values.req,
            max:Number(values.max),
            possibil:values.possibil
        }
        console.log(values);
        setModalEditVisibility(false);
        loadingSetter(true);
        await myContext.editOption(option);
        refreshOpcoesList();
        
    }

    const delOption = (id) => {
        confirm({
            title: 'Você quer realmente excluir essa opção?',
            icon: <ExclamationCircleOutlined />,
            content: 'Você não poderá utilizar essa opção em seus produtos.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            closable:true,
            async onOk() {
                loadingSetter(true);
                await myContext.delOption(id);
                refreshOpcoesList();
            },
            onCancel() {
            },
          });
        
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