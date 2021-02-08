import React from 'react';
import SideMenu from '../Components/SideMenu';
import "antd/dist/antd.css";

export default class Configuracoes extends React.Component {
    render() {
        return(
            <>
                <SideMenu name='configuracoes'>
                    <h1>This is the Configs page</h1>
                </SideMenu>
            </>
        )
    }   
}

