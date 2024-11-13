import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Button,Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

function CustomFooter() {
    return (
        <div style={{ background: "rgb(255, 128, 0)",display:"flex",flexDirection:"row", justifyContent: "center", alignItems: "center" }}>


            <div style={{ display: "flex", flexDirection: "column" }}>
                <Button color="default" variant="link"><LinkedinOutlined />LinkedIn</Button>
                <Button color="default" variant="link"><GithubOutlined />Github</Button>
                <Button color="default" variant="link"><MailOutlined />Email</Button>
               
            </div>
            <Divider type="vertical" style={{height:"10vh"}} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p style={{ color: "white" }}>Developed By Salih Emre Kocadere</p>
            </div>
           

        </div>
    );
}

export default CustomFooter;

