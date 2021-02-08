import React from 'react';
import SideMenu from '../Components/SideMenu';
import "antd/dist/antd.css";

export default class Relatorios extends React.Component {
    render() {
        return(
            <>
                <SideMenu name='relatorios'>
                    <h1>This is the Reports page</h1>
                </SideMenu>
            </>
        )
    }   
}