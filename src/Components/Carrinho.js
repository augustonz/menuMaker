import React,{useContext} from 'react';
import {Row,Col, Divider} from 'antd';
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
                    let produto=myState.findProductById(item.productId);
                    return(
                        <Row justify='center' align='middle'>
                            <Col span='18'>
                                <p style={{display:'inline'}}>{item.quant}x </p>
                                <p style={{display:'inline'}}>{produto.name}</p>
                            </Col>
                            <Col>
                                <p style={{display:'inline'}}>R${String((item.quant*item.val).toFixed(2)).replace('.',',')}</p>
                            </Col>
                            <Col style={{fontSize:'20px'}}>
                                <MoreOutlined/>
                            </Col>
                            {indx<carrinho.length-1?<Divider style={{margin:'3px'}}/>:null}
                        </Row>
                    )})}
            </div>

        </>
    )
}

export default Carrinho;