import logo from './logo.svg';
import './index.css';
import React from 'react';
import { Button, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import useResponsive from './useResponsive';

function CustomFooter() {
    const { isMobile } = useResponsive();
    return (
        <div className='custom-footer-div' >


            <div className='custom-footer-links-div'  >
                <Button color="default" variant="link" className='cutom-footer-links' href='https://www.linkedin.com/in/salih-emre-kocadere-7a61b0203/'         target="_blank" 
        rel="noopener noreferrer">
                    <LinkedinOutlined />LinkedIn
                </Button>
                <Button color="default" variant="link" className='cutom-footer-links' href='https://github.com/emrekocadere'>
                    <GithubOutlined />Github
                </Button>
                <Button color="default" variant="link" className='cutom-footer-links'><MailOutlined />Email</Button>
     
            </div>

            < Divider className="custom-footer-divider" type={isMobile ? "horizontal" : "vertical"} />

            <div style={{ display: "flex", alignItems: "center", color: "white", fontSize: "80%" }}>
                <p >Developed By Salih Emre Kocadere</p>
            </div>


        </div>
    );
}

export default CustomFooter;

