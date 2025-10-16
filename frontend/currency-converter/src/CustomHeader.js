import './index.css';
import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { GithubOutlined, LinkedinOutlined, CoffeeOutlined } from '@ant-design/icons';
import imagee from "./Images/Logo.png"

function CustomHeader() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff8000',
                }
            }}
        >
            <header className='custom-header'>
                <div className='header-inner'>
                    <div className='brand'>
                        <img className="header-img" src={imagee} alt="Currency Converter" />
                    </div>
                    <div className='header-actions'>
                        <Button 
                            type="text"
                            icon={<GithubOutlined />}
                            href="https://github.com/emrekocadere/currency-converter"
                            target="_blank"
                            className="custom-header-github-button"
                        >
                            GitHub
                        </Button>
                        <Button 
                            type="primary"
                            icon={<LinkedinOutlined />}
                            href="https://www.linkedin.com/in/salih-emre-kocadere-7a61b0203/"
                            target="_blank"
                            className="custom-header-linkedin-button"
                        >
                            LinkedIn
                        </Button>
                        <Button 
                            type="default"
                            icon={<CoffeeOutlined />}
                            href="https://www.buymeacoffee.com/emrekocadere"
                            target="_blank"
                            className="custom-header-coffee-button"
                        >
                            Buy me a coffee
                        </Button>
                    </div>
                </div>
            </header>
        </ConfigProvider>
    );
}

export default CustomHeader;

