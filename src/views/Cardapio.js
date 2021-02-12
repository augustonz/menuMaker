import React,{useState,useContext} from 'react';
import SideMenu from '../Components/SideMenu';
import "antd/dist/antd.css";
import {Row,Col,Tabs} from 'antd';

import {MenuContext} from '../contexts/ThemeContext';
import GroupsList from '../Components/GroupsList';
import ProdutosList from '../Components/ProdutosList';
import OpcionaisList from '../Components/OpcionaisList';

const {TabPane} = Tabs;
const Cardapio = () => {
  const myState = useContext(MenuContext);
  const [group,setGroup] = useState(myState.state.cardapio.grupos[0]);
  
  return(
    <>
      <SideMenu name='cardapio'>
        <Tabs type="card">
          <TabPane tab="Cardápio Principal" key="1">
            <Row justify='center'><Col><h1>Cardápio Principal</h1></Col></Row>
            <Row>
              <Col span='8'><GroupsList groupSetter={setGroup}/></Col>
              <Col span='16'><ProdutosList Group={group}/></Col>
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