import React,{useState,useContext, useEffect} from 'react';
import SideMenu from '../Components/SideMenu';
import "antd/dist/antd.css";
import {Row,Col,Tabs,Spin} from 'antd';
import {MenuContext} from '../contexts/ThemeContext';

import GroupsList from '../Components/GroupsList';
import ProdutosList from '../Components/ProdutosList';
import OpcionaisList from '../Components/OpcionaisList';

const {TabPane} = Tabs;
const Cardapio = () => {
  const myContext = useContext(MenuContext);

  const [loading,setLoading] = useState(true);
  const [loading2,setLoading2] = useState(true);
  const [group,setGroup] = useState(null);
  const [groupsList,setGroupsList] = useState(null);
  const [opcoesList,setOpcoesList] = useState(null);

  useEffect(async()=>{
    refreshGroupList();
    refreshOpcoesList();
  },[]);

  const refreshGroupList = async() => {
    setLoading(true);
    const grupos = await myContext.getMenu();
    setGroupsList(grupos);
    if (group!==null){
      var index=grupos.map( (grupo)=>{
        return grupo._id;
      }).indexOf(group._id);
      setGroup(grupos[index]);
    } else {
      setGroup(grupos[0]);
    }
    setLoading(false);
  }

  const refreshOpcoesList = async() => {
    setLoading2(true);
    const opcoes = await myContext.getOpcoes();
    setOpcoesList(opcoes);
    setLoading2(false);
  }

  return(
    <>
      <SideMenu name='cardapio'>
        
        <Tabs type="card">
          <TabPane tab="Cardápio Principal" key="1">
            <Row justify='center'><Col><h1>Cardápio Principal</h1></Col></Row>
            {loading? <div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'100%',padding:'35vh 0'}}><Spin size='large'/></div>:
            <Row>
              <Col span='8'><GroupsList loadingSetter={setLoading} groupSetter={setGroup} list={groupsList} refreshList={refreshGroupList}/></Col>
              <Col span='16'><ProdutosList loadingSetter={setLoading} grupo={group} refreshGroupList={refreshGroupList}/></Col>
            </Row>}
          </TabPane>
          <TabPane tab="Opcionais" key="2">
          {loading2? <div style={{backgroundColor:'white',width:'100%',textAlign:'center',height:'100%',padding:'35vh 0'}}><Spin size='large'/></div>:
            <OpcionaisList opcoes={opcoesList} loadingSetter={setLoading2} refreshOpcoesList={refreshOpcoesList}/>}
          </TabPane>
        </Tabs>
      </SideMenu>
    </>
  )
}

export default Cardapio;