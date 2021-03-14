import React,{useState,useContext} from 'react';
import {Col,Row,Button,Tooltip,Modal,Image} from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import NewProductModal from './NewProductModal';
import EditProductModal from './EditProductModal';
import AddOptionModal from './AddOptionModal';
import {MenuContext} from '../contexts/ThemeContext';

const {confirm} = Modal;

const ProdutosList = ({grupo,refreshGroupList,loadingSetter}) =>{

    const myContext=useContext(MenuContext);
    const [editItem,setEditItem] = useState({});
    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);
    const [isModalOptionVisible,setModalOptionVisibility]=useState(false);
    
    const ShowProducts = grupo!==null?grupo.products.map((item,index) => (
        <Row key={index} style={{paddingTop:'8px', backgroundColor:'white',marginLeft:'24px',marginBottom:'1px',minHeight:'15vh',alignContent:'center'}}>
            <Col span='4'><Image style={{padding:0}} preview={false} src={item.imgSrc} width='80px' /></Col>
            <Col span='12' style={{textAlign:'left',overflow:'hidden'}}>
                <h4 style={{marginBottom:'0px'}}>{item.name}</h4>
                <p style={{fontWeight:'lighter'}}>{item.desc}</p>
                {item.prices.map((price,index)=>(
                    <>
                        <p style={{margin:'0px'}}>{price.info}:<span style={{fontWeight:'bold',marginLeft:'5px'}} className='color'>R${String(price.val.toFixed(2)).replace('.',',')}</span></p> 
                    </>
                ))}
            </Col>
            <Col span='8' style={{paddingTop:'20px'}}>
                <Tooltip title='editar' color='white'><Button shape='circle' onClick={()=>editProduct(item)} icon={<EditOutlined />}/></Tooltip>
                <Tooltip title='opcionais' color='white'><Button style={{margin:'0 7px'}} shape='circle' onClick={()=>addOption(item)} icon={<PlusOutlined />}/></Tooltip>
                <Tooltip title='excluir' color='white'><Button shape='circle' danger onClick={()=>delProduct(item._id)} icon={<DeleteOutlined />}/></Tooltip>
            </Col>
        </Row>
    )):null;

    const newProduct = () =>{
        setModalNewVisibility(true);
    }

    const handleNewOk = async(values) =>{
        values.grupo={
            products:[],
            _id:grupo._id,
            name:grupo.name
        }
        for (var i=0;i<grupo.products.length;i++){
            values.grupo.products[i]=grupo.products[i]._id;
        }
        if (values.desc===undefined){
            values.desc='Descrição vazia'
        }
        if (values.price || values.price===0){
            values.prices=[{info:'Preço',val:Number(values.price)}];
        } else {
            for (var i in values.prices){
                values.prices[i].val=Number(values.prices[i].val);
            }
        }
        setModalNewVisibility(false);
        loadingSetter(true);
        await myContext.createProduct(values);
        refreshGroupList();
    }

    const editProduct = (item) => {
        setEditItem(item);
        setModalEditVisibility(true);
    }

    const handleEditOk = async(values) =>{
        if (values.desc===undefined){
            values.desc='Descrição vazia'
        }
        if (values.price || values.price===0){
            values.prices=[{info:'Preço',val:Number(values.price)}];
        } else {
            for (var i in values.prices){
                values.prices[i].val=Number(values.prices[i].val);
            }
        }
        setModalEditVisibility(false);
        loadingSetter(true);
        await myContext.editProduct(values);
        refreshGroupList();
    }

    const delProduct = (id) =>{
        confirm({
            title: 'Você quer realmente excluir esse Produto?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esse produto não poderá mais ser requisitado pelos clientes.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            closable:true,
            async onOk() {
                loadingSetter(true);
                await myContext.delProduct(grupo,id);
                refreshGroupList();
            },
            onCancel() {
            },
          });
    }

    const addOption = (item) => {
        setEditItem(item);
        setModalOptionVisibility(true);
    }

    const handleAddOption = async(list) => {
        let produto=editItem;
        produto.options=list;
        loadingSetter(true);
        setModalOptionVisibility(false);
        await myContext.editProduct(produto);
        refreshGroupList();
    }
    return(
        <>
            <AddOptionModal
            visible={isModalOptionVisible} 
            onOk={handleAddOption} 
            onCancel={() => {setModalOptionVisibility(false)}}
            selectedIds={editItem.options}/>

            <NewProductModal
            visible={isModalNewVisible} 
            onOk={handleNewOk} 
            onCancel={() => {setModalNewVisibility(false)}}/>

            <EditProductModal
            initialValues={editItem}
            visible={isModalEditVisible}
            onOk={handleEditOk} 
            onCancel={() => {setModalEditVisibility(false)}}/>
            
            
            <Row style={{marginBottom:10,justifyContent:'center'}}>
                <Col>
                    <Tooltip title='criar' color='white'><Button className='color' shape='circle' type='primary' onClick={newProduct} icon={<PlusOutlined />}/></Tooltip>
                </Col>
                <Col style={{marginLeft:10}}>{grupo?<h1 className='color' >{grupo.name}</h1>:<h1 className='color'>Selecione um grupo</h1>}</Col>
            </Row>

            {grupo?grupo.products.length===0?<h1 style={{padding:20}}>Adicione um produto ao grupo utilizando o botão acima</h1>:
            <div>{ShowProducts}</div>:null}
            

        </> 
    );
}

export default ProdutosList