import logo from './logo.svg';
import './index.css';
import React from 'react';
import { Button, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import useResponsive from './useResponsive';

function CustomFooter() {
    const { isMobile } = useResponsive();
    return (
        <div className='customFooterDiv' >


            <div className='customFooterLinksDiv'  >
                <Button color="default" variant="link" className='cutomFooterLinks'><LinkedinOutlined />LinkedIn</Button>
                <Button color="default" variant="link" className='cutomFooterLinks'><GithubOutlined />Github</Button>
                <Button color="default" variant="link" className='cutomFooterLinks'><MailOutlined />Email</Button>

            </div>

            < Divider className="customFooterDivider" type={isMobile ? "horizontal" : "vertical"} />

            <div style={{ display: "flex", alignItems: "center",color: "white",fontSize:"80%" }}>
                <p >Developed By Salih Emre Kocadere</p>
            </div>


        </div>
    );
}

export default CustomFooter;

