import React,{useState,useEffect,useContext} from 'react';
import {List,Spin} from 'antd';
import {useHistory} from 'react-router-dom';
import {MenuContext} from '../contexts/ThemeContext';
const Menu = () =>{

    const [lista,setLista] = useState([]);
    const [loading,setLoading] = useState(true);
    const myContext = useContext(MenuContext);

    useEffect(async()=>{
        setLista(await myContext.getMenu());
        setLoading(false);
    },[myContext]);

    const history=useHistory();

    return (
        <>
            {loading?<div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'72vh',padding:'35vh 0'}}><Spin size='large'/><br/><h2>Carregando menu...</h2></div>:
            
                lista.map((val,index)=>{

                    return(
                    <>
                        <List style={{overflowX:'hidden',backgroundColor:'white'}}
                        itemLayout='vertical'
                        header={
                        <div style={{paddingLeft:'5px'}}>
                            <h1>{val.name}</h1>
                        </div>}
                        dataSource={val.products}
                        renderItem={item=>(
                            <List.Item
                            style={{backgroundColor:'white',paddingRight:'15px',paddingLeft:'15px'}} 
                            onClick={()=>history.push('/produto/'+item._id)}
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
                        </>)
                })
            }
        </>
    )
}

export default Menu;