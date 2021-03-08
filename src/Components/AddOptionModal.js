import React,{useState,useEffect} from 'react';
import {Modal,Checkbox,Row,Col} from 'antd';
import axios from 'axios';

const AddOptionModal = (
    {
    visible,
    onCancel,
    onOk,
    selectedIds}) => {
    const [listaOpcoes,setListaOpcoes] = useState([]);
    const [listaSelec,setListaSelec] = useState(selectedIds);
    function onChange(changeValues) {
        setListaSelec(changeValues);
    }

    useEffect(()=>{
        if (visible){
            axios.get('https://augustomenumaker.herokuapp.com/opcao/').then(res=>setListaOpcoes(res.data))
            .catch(err=>console.log(err));
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
                </Checkbox.Group>
            </Modal>
        </>
    )
}

export default AddOptionModal;