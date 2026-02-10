import React from 'react';
import { Button, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined, HeartFilled } from '@ant-design/icons';
import { useResponsive } from './useResponsive';
import logo from "../../Images/Logo.svg";

function Footer() {
    const { isMobile } = useResponsive();
    return (
        <footer className='custom-footer-div'>
            <div className={`custom-footer-content`}>
                <img className="footer-logo" src={logo} alt="Currency Converter" />
                
                {!isMobile && <Divider type="vertical" className="custom-footer-divider" />}
                
                <div className='custom-footer-links-div'>
                    <Button 
                        type="link" 
                        className='cutom-footer-links' 
                        href='https://www.linkedin.com/in/salih-emre-kocadere-7a61b0203/'
                        target="_blank" 
                        rel="noopener noreferrer"
                        icon={<LinkedinOutlined />}
                    >
                        LinkedIn
                    </Button>
                    <Button 
                        type="link" 
                        className='cutom-footer-links' 
                        href='https://github.com/emrekocadere'
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<GithubOutlined />}
                    >
                        GitHub
                    </Button>

                </div>

                {!isMobile && <Divider type="vertical" className="custom-footer-divider" />}

                <div className="custom-footer-credits">
                    <span>Made with</span>
                    <HeartFilled className="custom-footer-heart" />
                    <span>by Salih Emre Kocadere</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
