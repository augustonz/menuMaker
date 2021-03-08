import React,{useState,useContext, useEffect} from 'react';
import SideMenu from '../Components/SideMenu';
import "antd/dist/antd.css";
import {Row,Col,Tabs} from 'antd';
import axios from 'axios';

import GroupsList from '../Components/GroupsList';
import ProdutosList from '../Components/ProdutosList';
import OpcionaisList from '../Components/OpcionaisList';

const {TabPane} = Tabs;
const Cardapio = () => {
  //const myState = useContext(MenuContext);

  const [group,setGroup] = useState({name:'',products:[]});
  const [groupsList,setGroupsList] = useState([{name:'',products:[]}]);

  const refreshGroupList = () => {
    axios.get('https://augustomenumaker.herokuapp.com/grupo').then(res=>{
            setGroupsList(res.data);
            if (group._id){
              axios.get('https://augustomenumaker.herokuapp.com/grupo/'+group._id).then(res=>setGroup(res.data))
              .catch(err=>console.log(err));
            }
        })
        .catch(err=>console.log(err));
  }

  return(
    <>
      <SideMenu name='cardapio'>
        <Tabs type="card">
          <TabPane tab="Cardápio Principal" key="1">
            <Row justify='center'><Col><h1>Cardápio Principal</h1></Col></Row>
            <Row>
              <Col span='8'><GroupsList groupSetter={setGroup} list={groupsList} refreshList={refreshGroupList}/></Col>
              <Col span='16'><ProdutosList grupo={group} refreshGroupList={refreshGroupList}/></Col>
            </Row>
          </TabPane>
          <TabPane tab="Opcionais" key="2">
            <OpcionaisList/>
          </TabPane>
        </Tabs>
      </SideMenu>
    </>
  )
}

export default Cardapio;