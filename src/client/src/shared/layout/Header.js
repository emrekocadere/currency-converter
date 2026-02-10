import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { GithubOutlined, LinkedinOutlined, CoffeeOutlined } from '@ant-design/icons';
import imagee from "../../Images/Logo.svg";

function Header() {
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
                        <picture>
                            <source media="(max-width: 768px)" srcSet="/mobil-logo.svg" />
                            <img className="header-img" src={imagee} alt="Currency Converter" />
                        </picture>
                    </div>
                    <div className='header-actions'>
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

export default Header;
