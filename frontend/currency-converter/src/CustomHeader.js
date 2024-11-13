import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Button, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import imagee from "./Images/Logo.png"
function CustomHeader() {
    return (
        <div style={{ display: "flex", flexDirection: "column", boxShadow: "5px 5px 5px 5px rgb(222, 222, 222)" }}>
            <div>
                <img src={imagee} style={{ height: "10vh", width: "12.5vw", paddingLeft: "5vw", paddingTop: "1vh" }} ></img>

            </div>

            <Divider style={{ background: "rgb(255, 128, 0)" }} />
        </div>
    );
}

export default CustomHeader;

