import React,{useEffect,useState} from 'react';

import {Col,Row,Button,Tooltip,Modal,Image} from 'antd';
import {PlusOutlined,EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import axios from 'axios';

import NewProductModal from './NewProductModal';
import EditProductModal from './EditProductModal';
import AddOptionModal from './AddOptionModal';

const {confirm} = Modal;

const ProdutosList = ({grupo,refreshGroupList}) =>{

    const [editItem,setEditItem] = useState({});
    const [isModalNewVisible,setModalNewVisibility]=useState(false);
    const [isModalEditVisible,setModalEditVisibility]=useState(false);
    const [isModalOptionVisible,setModalOptionVisibility]=useState(false);
    const [produtos,setProdutos]=useState([]);
    const group=grupo;
    
    function refreshList() {
        if (grupo){
            if (grupo._id){
                axios.get(`https://augustomenumaker.herokuapp.com/grupo/${grupo._id}/produtos`).then(res=>{
                    setProdutos(res.data)})
                .catch(err=>console.log(err));
            }   
        }
    }

    useEffect(()=>{
        refreshList();
    },[grupo])
    
    
    const ShowProducts = group?produtos.map((item,index) => (
        <Row key={index} style={{paddingTop:'8px', backgroundColor:'white',marginLeft:'24px',marginBottom:'1px',minHeight:'15vh',alignContent:'center'}}>
            <Col span='4'><Image style={{padding:0}} preview={false} src={item.imgSrc} width='80px' /></Col>
            <Col span='16' style={{textAlign:'left',overflow:'hidden'}}>
                <h4 style={{marginBottom:'0px'}}>{item.name}</h4>
                <p style={{fontWeight:'lighter'}}>{item.desc}</p>
                {item.prices.map((price,index)=>(
                    <>
                        <p style={{margin:'0px'}}>{price.info}:<span style={{fontWeight:'bold',marginLeft:'5px'}} className='color'>R${String(price.val.toFixed(2)).replace('.',',')}</span></p> 
                    </>
                ))}
            </Col>
            <Col span='4' style={{paddingTop:'20px'}}>
                <Tooltip title='editar' color='white'><Button shape='circle' onClick={()=>editProduct(item)} icon={<EditOutlined />}/></Tooltip>
                <Tooltip title='opcionais' color='white'><Button style={{margin:'0 7px'}} shape='circle' onClick={()=>addOption(item)} icon={<PlusOutlined />}/></Tooltip>
                <Tooltip title='excluir' color='white'><Button shape='circle' danger onClick={()=>delProduct(item._id)} icon={<DeleteOutlined />}/></Tooltip>
            </Col>
        </Row>
    )):null;

    const newProduct = () =>{
        setModalNewVisibility(true);
    }

    const handleNewOk = (values) =>{
        values.grupo=group;
        if (values.desc===undefined){
            values.desc='Descrição vazia'
        }
        if (values.price){
            values.prices=[{info:'Preço',val:Number(values.price)}];
        } else {
            for (var i in values.prices){
                values.prices[i].val=Number(values.prices[i].val);
            }
        }
        axios.post('https://augustomenumaker.herokuapp.com/produto/add',values).then(res=>{refreshGroupList()})
        .catch(err=>console.log(err));
        //myState.newProduct(group.id,product);
        setModalNewVisibility(false);
    }

    const editProduct = (item) => {
        setEditItem(item);
        setModalEditVisibility(true);
    }

    const handleEditOk = (values) =>{
        if (values.desc===undefined){
            values.desc='Descrição vazia'
        }
        if (values.price){
            values.prices=[{info:'Preço',val:Number(values.price)}];
        } else {
            for (var i in values.prices){
                values.prices[i].val=Number(values.prices[i].val);
            }
        }
        console.log(values);
        axios.post('https://augustomenumaker.herokuapp.com/produto/update/'+values._id,values).then(res=>refreshList())
        .catch(err=>console.log(err));
        //myState.editProduct(group.id,product);
        setModalEditVisibility(false);
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
            onOk() {
                axios.delete('https://augustomenumaker.herokuapp.com/produto/'+id).then(res=>{
                    let Grupo=group;
                    
                    var index = Grupo.products.map(x => {
                        return x;
                    }).indexOf(id);
                    Grupo.products.splice(index,1);
                    
                    axios.post('https://augustomenumaker.herokuapp.com/grupo/update/'+Grupo._id,Grupo).then(res=>refreshGroupList())
                    .catch(err=>console.log(err));
                })
                .catch(err=>console.log(err));
              //myState.delProduct(group.id,id);
            },
            onCancel() {
            },
          });
    }

    const addOption = (item) => {
        setEditItem(item);
        setModalOptionVisibility(true);
    }

    const handleAddOption = (list) => {
        let produto=editItem;
        produto.options=list;
        axios.post('https://augustomenumaker.herokuapp.com/produto/update/'+produto._id,produto).then(res=>refreshList())
        .catch(err=>console.log(err));
        //myState.editProduct(group.id,produto);
        setModalOptionVisibility(false);
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
                <Col style={{marginLeft:10}}>{group?<h1 className='color' >{group.name}</h1>:<h1 className='color'>Selecione um grupo</h1>}</Col>
            </Row>

            {group?group.products.length===0?<h1 style={{padding:20}}>Adicione um produto ao grupo utilizando o botão acima</h1>:
            <div>{ShowProducts}</div>:null}
            

        </> 
    );
}

export default ProdutosList