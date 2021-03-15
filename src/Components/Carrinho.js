import React,{useContext} from 'react';
import {Row,Col, Divider,Popover} from 'antd';
import {MoreOutlined} from '@ant-design/icons';
import {MenuContext} from '../contexts/ThemeContext';
import OpcoesCarrinho from './OpcoesCarrinho';

const Carrinho = () => {
    //{quant:1,val:0,productId:1,options:[{name:'',add:0}]}
    //{id:1,name:'Produto 1',desc:'Descrição',imgSrc:'/placeholder.png',prices:[{info:'Preço: ',val:10.50}],options:[1]}
    const myState = useContext(MenuContext);
    const carrinho=myState.state.carrinho;

    function getTotalCarrinho(){
        var total=0;
        carrinho.forEach((item)=>{
            var sumOptions=0
            item.options.forEach((val)=>{
                if (typeof(val[0])=='string'){
                    sumOptions+=val[1];
                } else {
                    val.forEach((Val)=>{
                        sumOptions+=Val[1];
                    });
                }
            });
            total+=item.quant*(item.val.val+sumOptions);
        })
        return total;
    }
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
                    var sumOptions = 0;
                    item.options.forEach((val)=>{
                        if (typeof(val[0])=='string'){
                            sumOptions+=val[1];
                        } else {
                            val.forEach((Val)=>{
                                sumOptions+=Val[1];
                            });
                        }
                    });
                    return(
                        <>
                            <Row justify='center' align='middle'>
                                <Col span='18'>
                                    <p style={{display:'inline'}}>{item.quant}x </p>
                                    <p style={{display:'inline'}}>{item.product.name} </p>
                                    {item.product.prices.length>1?item.val.info:null}
                                </Col>
                                <Col>
                                    <p style={{display:'inline'}}>R${String((item.quant*(item.val.val+sumOptions)).toFixed(2)).replace('.',',')}</p>
                                </Col>
                                <Col style={{fontSize:'20px'}}>
                                    <Popover content={<p onClick={()=>myState.removeProdutoCarrinho(item.id)}>Excluir</p>} placement="bottom" trigger="click">
                                        <MoreOutlined/>
                                    </Popover>
                                </Col>
                            </Row>
                            <Row justify='center' align='middle'>
                                <OpcoesCarrinho opcoes={item.options}/>
                                <Divider style={{margin:'3px'}}/>
                            </Row>
                        </>
                    )})}


            </div>

            <h2 style={{paddingLeft:'20px',paddingBottom:'10px'}}>Total: R${String(getTotalCarrinho().toFixed(2)).replace('.',',')}</h2>

        </>
    )
}

export default Carrinho;