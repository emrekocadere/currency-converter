import './index.css';
import React, { useState, useEffect } from 'react';
import { Typography, Col, Row, Modal, Button, Divider } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import CurrencyConverter from './CurrencyConverter';
import GoogleChart from './GoogleLineChart';
import NewsPage from './Pages/NewsPage';
import CommonCurrenciesRates from './CommonCurrenciesRates';
import useResponsive from './useResponsive';

export default function HomePage() {
    const { isDesktop, isMobile, isTablet } = useResponsive();

    const [currentBaseCurrency, setCurrentBaseCurrency] = useState("AUD");
    const [currentTargetCurrency, setCurrentTargetCurrency] = useState("CAD");
    const [currencyGraph, setCurrencyGraph] = useState("HomePage");
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        // Modal'ı sayfa yüklendiğinde göster
        setIsModalVisible(true);
    }, []);

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    function setCurrentCurrenciesCallback(currencies) {
        setCurrentBaseCurrency(currencies.baseCurrency);
        setCurrentTargetCurrency(currencies.targetCurrency);
    }

    return (
        <div className='home-page-div'>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>💱 Currency Converter</span>
                    </div>
                }
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                centered
                width={650}
                okText="Get Started 🚀"
                cancelText="Close"
                footer={[
                    <Button key="github" icon={<GithubOutlined />} onClick={() => window.open('https://github.com/emrekocadere/currency-converter', '_blank')}>
                        View on GitHub
                    </Button>,
                    <Button key="close" onClick={handleModalCancel}>
                        Close
                    </Button>,
                    <Button key="start" type="primary" onClick={handleModalOk}>
                        Get Started 🚀
                    </Button>
                ]}
            >
                <div style={{ padding: '10px 0' }}>
                    <p style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>
                        A modern, full-stack currency converter application built with enterprise-grade architecture and cutting-edge technologies.
                    </p>
                    
                    <Divider orientation="left">🏗️ Architecture</Divider>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                            <span style={{ background: '#2E8B57', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                🏛️ N-Tier Architecture
                            </span>
                            <span style={{ background: '#FF6347', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                📦 Repository Pattern
                            </span>
                            <span style={{ background: '#4682B4', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                💉 Dependency Injection
                            </span>
                            <span style={{ background: '#9932CC', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                ⚙️ Service Layer Pattern
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#666', margin: '5px 0' }}>
                            Enterprise-grade N-Tier architecture with clean separation of concerns, dependency injection, and proven design patterns.
                        </p>
                    </div>

                    <Divider orientation="left">🎨 Frontend Stack</Divider>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ background: '#61DAFB', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                ⚛️ React 18
                            </span>
                            <span style={{ background: '#1890ff', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                🐜 Ant Design
                            </span>
                            <span style={{ background: '#007FFF', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                📊 MUI X-Charts
                            </span>
                            <span style={{ background: '#5A67D8', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                📱 React Responsive
                            </span>
                            <span style={{ background: '#671DDF', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                🌐 Axios
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#666', margin: '5px 0' }}>
                            Modern React ecosystem with component-based architecture, responsive design, and efficient data visualization.
                        </p>
                    </div>

                    <Divider orientation="left">🚀 Backend Stack</Divider>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ background: '#512BD4', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                🔷 .NET 8
                            </span>
                            <span style={{ background: '#68217A', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                🗄️ Entity Framework
                            </span>
                            <span style={{ background: '#CC2927', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                🗃️ SQL Server
                            </span>
                            <span style={{ background: '#FF6B35', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                ⏰ Quartz.NET
                            </span>
                            <span style={{ background: '#1E3A8A', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                📝 Serilog
                            </span>
                            <span style={{ background: '#10B981', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                📋 Swagger
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#666', margin: '5px 0' }}>
                            High-performance .NET backend with ORM, scheduled jobs, structured logging, and comprehensive API documentation.
                        </p>
                    </div>

                    <Divider orientation="left">✨ Key Features</Divider>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                        <div>• Real-time currency conversion</div>
                        <div>• Historical rate charts</div>
                        <div>• Multi-currency support</div>
                        <div>• Financial news integration</div>
                        <div>• Responsive design</div>
                        <div>• Background data processing</div>
                        <div>• RESTful API architecture</div>
                        <div>• Enterprise scalability</div>
                    </div>
                </div>
            </Modal>

            <Row>
                <h2  style={{ paddingBottom: "1vh" }}>
                    Converter
                </h2>
            </Row>

            {/* Eğer isDesktopOrLaptop ise düzenleme yapılır */}
            <Row style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                <Col span={isDesktop ? 12 : 24}>
                    <CurrencyConverter onCurrencyChange={setCurrentCurrenciesCallback} />
                </Col>
                <Col
                    span={isDesktop ? 12 : 24}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: isDesktop ? "-7vh" : "0" }}
                >
                    <GoogleChart currencyRates={currencyGraph} currentBaseCurrency={currentBaseCurrency} currentTargetCurrency={currentTargetCurrency}></GoogleChart>
                </Col>
                
            </Row>

      
            {isMobile ? (
                <Row gutter={[16, 16]} style={{ flexDirection: 'column' }}>
                    <Col span={24}>
                        <CommonCurrenciesRates 
                            style={{ marginTop: "50vh" }} 
                            currentBaseCurrency={currentBaseCurrency} 
                            currentTargetCurrency={currentTargetCurrency} 
                        />
                    </Col>

                    <Typography.Title level={2} style={{ paddingBottom: "1vh"}}>
                        News
                    </Typography.Title>
                    <Col span={24}>
                        <NewsPage />
                    </Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                            News
                        </Typography.Title>
                    </Row>

                    <Row gutter={[16, 16]} style={{ flexDirection: 'row' }}>
                        <Col span={12}>
                            <NewsPage />
                        </Col>
                        <Col span={12} className="common-currencies-rates-col">
                            <CommonCurrenciesRates 
                                currentBaseCurrency={currentBaseCurrency} 
                                currentTargetCurrency={currentTargetCurrency} 
                            />
                        </Col>
                    </Row>
                </>
            )}


        </div>
    );
}



