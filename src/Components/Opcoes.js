import React,{useContext,useState} from 'react';

import {Row,Col,Checkbox} from 'antd'
import {MenuContext} from '../contexts/ThemeContext'


const Opcoes = ({opcoesIds}) => {

    const myState=useContext(MenuContext);
    const listaOpcoes = myState.findOptionsById(opcoesIds);
    const [finalResp,setFinalResp] = useState('[]');
    const [listas,setListas] = useState(()=>{
        let list=[]
        for (let i=0;i<opcoesIds.length;i++){
            list.push('[]');
        }
        return list;
    });
    console.log(listas);
    return (
        <>
            {listaOpcoes.map((opcoes,index)=>{
                const handleMult = (e) => {
                    if (e.target.checked){
                        if (JSON.parse(listas[index]).length<=opcoes.max-1){
                            let newArr=listas;
                            let newIndex=JSON.parse(newArr[index])
                            newIndex.push(JSON.parse(e.target.value));
                            newArr[index]=JSON.stringify(newIndex);
                            setListas([...newArr]);
                        }
                    } else {
                        let newArr=listas;
                        let newIndex=JSON.parse(listas[index]);
                        newIndex.splice(newIndex.findIndex(item=>{return item[0]===JSON.parse(e.target.value)[0]}),1);
                        newArr[index]=JSON.stringify(newIndex);
                        setListas([...newArr]);
                    }
                    
                }
                return(
                <>
                    <h1 style={{display:'inline'}}>{opcoes.title}</h1>
                    <h3 style={{paddingLeft:'20px',display:'inline'}}>Máximo: <span style={{color:'#47b3f7'}}>{opcoes.max}</span></h3>

                    <Checkbox.Group style={{width:'100%'}}
                    value={listas[index]}>
                        {opcoes.possibil.map((item)=>(
                            <Row>
                                <Col span='10'>
                                    <h3>{item.name}</h3>
                                </Col>
                                <Col span='10'>
                                    <h3>{item.add}</h3>
                                </Col>
                                <Col>
                                    <Checkbox value={JSON.stringify([item.name,item.add])} onClick={opcoes.max!==1?e=>handleMult(e):e=>{
                                        let newArr=listas;
                                        newArr[index]=[e.target.value];
                                        setListas([...newArr]);
                                        
                                    }}/>
                                </Col>
                            </Row>
                        ))}
                    </Checkbox.Group>
                    
                </>)
            })}
        </>
    )
}

export default Opcoes;