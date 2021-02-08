import React, { useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';

import {Menu,Layout,Image} from 'antd';
import {
    BarChartOutlined,
    ShopOutlined,
    ControlOutlined,
    BookOutlined
} from '@ant-design/icons';

import "antd/dist/antd.css";
import {MenuContext} from '../contexts/ThemeContext';

const { Sider,Header,Content } = Layout;

const SideMenu = (props) => {

    const myState = useContext(MenuContext);
    const [windowWidth] = useState(window.innerWidth);
    const [margin,setMargin] = useState(myState.state.collapsed===false&&windowWidth>576?200:80);
    

    const history=useHistory();
    const handleClick = (event) =>{
        history.push('/loja/117/'+event.key);
    }

    return(
        <Layout>
            <Sider 
            width='200px' className='sider' 
            collapsible='true'
            defaultCollapsed={myState.state.collapsed} onCollapse={(collapsed,type)=>{
                myState.updateCollapse(collapsed);
                setMargin(myState.state.collapsed&&windowWidth>576?200:80);
                
            }}
                >
                <div className="logo" >
                    <Image src='/logo.png' width='48px' height='54px' preview={false}/>
                </div>
                <Menu id='menu' mode="inline" defaultSelectedKeys={[props.name]} onClick={handleClick} className='menu'>
                    <Menu.Item key="loja" icon={<ShopOutlined style={{fontSize:'24px' ,marginRight:'0'}}/>} className={myState.state.collapsed?'test big':'test'}>
                    Loja
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="cardapio" icon={<BookOutlined style={{fontSize:'24px' ,marginRight:'0'}} />} className={myState.state.collapsed?'test big':'test'}>
                    Cardápio
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="relatorios" icon={<BarChartOutlined style={{fontSize:'24px' ,marginRight:'0'}} />} className={myState.state.collapsed?'test big':'test'}>
                    Relatórios
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="configuracoes" icon={<ControlOutlined style={{fontSize:'24px' ,marginRight:'0'}} />} className={myState.state.collapsed?'test big':'test'}>
                    Configurações
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: margin }}>
                <Header style={{ padding: 0 ,background:'#47b3f7'}} />
                    <Content style={{ padding: '24px 16px 0', overflow: 'initial',background:'#ffffff' }}>
                        <div style={{ padding: 24, textAlign: 'center' }}>
                        {props.children}
                        </div>
                    </Content>
            </Layout>
        </Layout>
    );
}

export default SideMenu;
