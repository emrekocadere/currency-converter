import logo from './logo.svg';
import './index.css';
import React from 'react';
import { Button, ConfigProvider, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import imagee from "./Images/Logo.png"
function CustomHeader() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Divider: {
                        orientationMargin: "0px"
                    }
                }
            }}
        >


            <div className='customHeader' >
                <div>
                    <img className="headerImg" src={imagee} ></img>

                </div>

                <Divider className='divider' />
            </div>
        </ConfigProvider>
    );
}

export default CustomHeader;

