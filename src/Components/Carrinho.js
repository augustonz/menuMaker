import React,{useContext} from 'react';
import {Row,Col, Divider,Popover} from 'antd';
import {MoreOutlined} from '@ant-design/icons';
import {MenuContext} from '../contexts/ThemeContext';
const Carrinho = () => {
    //{quant:1,val:0,productId:1,options:[{name:'',add:0}]}
    //{id:1,name:'Produto 1',desc:'Descrição',imgSrc:'/placeholder.png',prices:[{info:'Preço: ',val:10.50}],options:[1]}
    const myState = useContext(MenuContext);
    const carrinho=myState.state.carrinho;

    return (
        <>
            <div style={{padding:'10px',fontWeight:'bolder'}}>
                <Row justify='start' style={{height:'16px'}}>
                    <Col offset='1' span='17'>
                        <p>Itens</p>
                    </Col>
                    <Col offset='1'>
                        <p>Preço</p>
                    </Col>
                </Row>
        
                {carrinho.map((item,indx)=>{
                    console.log(item);
                    return(
                        <Row justify='center' align='middle'>
                            <Col span='18'>
                                <p style={{display:'inline'}}>{item.quant}x </p>
                                <p style={{display:'inline'}}>{item.product.name}</p>
                            </Col>
                            <Col>
                                <p style={{display:'inline'}}>R${String((item.quant*item.val).toFixed(2)).replace('.',',')}</p>
                            </Col>
                            <Col style={{fontSize:'20px'}}>
                            <Popover content={<p onClick={()=>myState.removeProdutoCarrinho(item.id)}>Excluir</p>} placement="bottom" trigger="click">
                                <MoreOutlined/>
                            </Popover>
                                
                            </Col>
                            <Divider style={{margin:'3px'}}/>
                        </Row>
                    )})}
            </div>

        </>
    )
}

export default Carrinho;