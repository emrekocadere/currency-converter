import logo from './logo.svg';
import './index.css';
import React from 'react';
import { Button, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import useResponsive from './useResponsive';

function CustomFooter() {
    const { isTabletOrMobile } = useResponsive();
    return (
        <div className='customFooterDiv' style={{}}>


            <div className='customFooterLinks' >
                <Button color="default" variant="link" ><LinkedinOutlined />LinkedIn</Button>
                <Button color="default" variant="link"><GithubOutlined />Github</Button>
                <Button color="default" variant="link"><MailOutlined />Email</Button>

            </div>

            < Divider className="customFooterDivider" type={isTabletOrMobile ? "horizontal" : "vertical"} />

            <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ color: "white" }}>Developed By Salih Emre Kocadere</p>
            </div>


        </div>
    );
}

export default CustomFooter;

