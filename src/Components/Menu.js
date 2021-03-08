import React,{useState,useEffect} from 'react';
import {List} from 'antd';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Menu = () =>{

    const [grupos,setGrupos]=useState([]);
    const [produtos,setProdutos]=useState([]);

    useEffect(async()=>{
        const response = await axios.get("https://augustomenumaker.herokuapp.com/grupo")
        setGrupos(response.data);
    },[]);

    useEffect(async ()=>{
        console.log(grupos);
        var temp=[];
        for (var grupo=0;grupo<grupos.length;grupo++){
            const response= await axios.get(`https://augustomenumaker.herokuapp.com/grupo/${grupos[grupo]._id}/produtos`);
            temp.push(response.data)
        }
        setProdutos(temp);
        
    },[grupos]);
    
    
    

    
    
    const history=useHistory();

    return (
        <>
            { 
                grupos.map((val,index)=>{

                    return(
                    <>
                        <List style={{overflowX:'hidden',backgroundColor:'white'}}
                        itemLayout='vertical'
                        header={
                        <div style={{paddingLeft:'5px'}}>
                            <h1>{val.name}</h1>
                        </div>}
                        dataSource={produtos[index]}
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