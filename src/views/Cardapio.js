import React from 'react';
import SideMenu from '../Components/SideMenu';
import "antd/dist/antd.css";

import {Row,Col,Tabs} from 'antd';

import GroupsList from '../Components/GroupsList';
import ProdutosList from '../Components/ProdutosList';
import OpcionaisList from '../Components/OpcionaisList';

const {TabPane} = Tabs;
export default class Cardapio extends React.Component {
    render() {
        return(
          <>
            <SideMenu name='cardapio'>
              <Tabs type="card">
                <TabPane tab="Cardápio Principal" key="1">
                  <Row justify='center'><Col><h1>Cardápio Principal</h1></Col></Row>
                  <Row>
                    <Col span='8'><GroupsList/></Col>
                    <Col span='16'><ProdutosList/></Col>
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
}

