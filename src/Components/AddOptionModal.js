import React,{useState,useEffect,useContext} from 'react';
import {Modal,Checkbox,Row,Col,Spin} from 'antd';
import {MenuContext} from '../contexts/ThemeContext';

const AddOptionModal = (
    {
    visible,
    onCancel,
    onOk,
    selectedIds}) => {

    const myContext=useContext(MenuContext);
    const [loading,setLoading] = useState(true);
    const [listaOpcoes,setListaOpcoes] = useState([]);
    const [listaSelec,setListaSelec] = useState(selectedIds);
    function onChange(changeValues) {
        setListaSelec(changeValues);
    }

    useEffect(async()=>{
        if (visible){
            setListaOpcoes(await myContext.getOpcoes());
            setLoading(false);
            setListaSelec(selectedIds);
        } else {
            setListaSelec([]);
        }

    },[visible])
    return (
        <>
            <Modal
            visible={visible}
            title='Adicionar opções'
            okText='Confirmar'
            cancelText='Cancelar'
            onCancel={onCancel}
            onOk={() => {onOk(listaSelec)}}
            >
                {loading?<div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'72vh',padding:'35vh 0'}}><Spin size='large'/><br/></div>:
                <Checkbox.Group style={{width:'100%',flexDirection:'row'}} onChange={onChange} value={listaSelec}>
                    <Row>
                    {listaOpcoes.map((opcoes)=>(
                        <Col span='12'>
                            <Row align='middle'>
                                <Col style={{margin:'auto 0'}}>
                                    <Checkbox value={opcoes._id}></Checkbox>
                                </Col>
                                <Col style={{marginLeft:'15px'}}>
                                    <h1>{opcoes.title}</h1>
                                </Col>
                            </Row>
                            {opcoes.possibil.map((item)=>(
                                <Row>
                                    <Col span='12'>
                                        <h3>{item.name}</h3>
                                    </Col>
                                    <Col>
                                        <h3 style={{color:'#47b3f7'}}>+R${Number(item.add).toFixed(2).replace('.',',')}</h3>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    ))}
                    </Row>
                </Checkbox.Group>}
            </Modal>
        </>
    )
}

export default AddOptionModal;