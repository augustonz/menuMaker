import React,{useContext} from 'react';
import {List} from 'antd';
import {useHistory} from 'react-router-dom';
import {MenuContext} from '../contexts/ThemeContext';

const Menu = () =>{

    const myState = useContext(MenuContext);
    const history=useHistory();

    return (
        <>
            { 
                myState.state.cardapio.grupos.map((val,index)=>(
                    <>
                        <List style={{overflowX:'hidden'}}
                        itemLayout='vertical'
                        style={{backgroundColor:'white'}}
                        header={
                        <div style={{paddingLeft:'5px'}}>
                            <h1>{val.name}</h1>
                        </div>}
                        dataSource={val.products}
                        renderItem={item=>(
                            <List.Item
                            style={{backgroundColor:'white',paddingRight:'15px',paddingLeft:'15px'}} 
                            onClick={()=>history.push('/produto/'+item.id)}
                            extra={
                                <img src={item.imgSrc}
                                alt='logo'
                                style={{width:'15vh',height:'15vh',margin:'0px'}} />
                            }>
                                <h1>{item.name}</h1>
                                <p style={{color:'GrayText'}}>{item.desc}</p>
                                {item.prices.length>1?<h3 style={{display:'inline'}}>A partir de </h3>:<h3 style={{display:'inline'}}>Apenas </h3>} <h1 style={{display:'inline',color:'#47b3f7'}}>R${item.prices[0].val.toFixed(2).toString().replace('.',',')}</h1>
                            </List.Item>
                        )}>
                        </List>
                        </>
                ))
            }
        </>
    )
}

export default Menu;