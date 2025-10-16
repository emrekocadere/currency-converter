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
                    <div className="modal-title-container">
                        <span>💱 Currency Converter</span>
                    </div>
                }
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                centered
                width={isMobile ? '95%' : 700}
                okText="Get Started 🚀"
                cancelText="Close"
                styles={{
                    content: {
                        background: 'rgba(16, 20, 36, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 128, 0, 0.2)',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    },
                    header: {
                        background: 'transparent',
                        borderBottom: '1px solid rgba(255, 128, 0, 0.2)',
                        paddingBottom: '16px',
                    },
                    body: {
                        padding: '24px',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    },
                    footer: {
                        background: 'transparent',
                        borderTop: '1px solid rgba(255, 128, 0, 0.2)',
                        paddingTop: '16px',
                    }
                }}
                footer={[
                    <Button 
                        key="github" 
                        icon={<GithubOutlined />} 
                        onClick={() => window.open('https://github.com/emrekocadere/currency-converter', '_blank')}
                        className="modal-footer-button-secondary"
                    >
                        View on GitHub
                    </Button>,
                    <Button 
                        key="close" 
                        onClick={handleModalCancel}
                        className="modal-footer-button-secondary"
                    >
                        Close
                    </Button>,
                    <Button 
                        key="start" 
                        type="primary" 
                        onClick={handleModalOk}
                        className="modal-footer-button-primary"
                    >
                        Get Started 🚀
                    </Button>
                ]}
            >
                <div className="modal-content-wrapper">
                    <p className="modal-intro-text">
                        A modern, full-stack currency converter application built with enterprise-grade architecture and cutting-edge technologies.
                    </p>
                    
                    <Divider 
                        orientation="left" 
                        style={{ 
                            borderColor: 'rgba(255, 128, 0, 0.2)',
                            color: '#e8eaed',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        🏗️ Architecture
                    </Divider>
                    
                    <div className="modal-section-wrapper-arch">
                        <div className="modal-badge-container">
                            <span className="modal-badge modal-badge-arch-1">
                                🏛️ N-Tier Architecture
                            </span>
                            <span className="modal-badge modal-badge-arch-2">
                                📦 Repository Pattern
                            </span>
                            <span className="modal-badge modal-badge-arch-3">
                                💉 Dependency Injection
                            </span>
                            <span className="modal-badge modal-badge-arch-4">
                                ⚙️ Service Layer Pattern
                            </span>
                        </div>
                        <p className="modal-section-description">
                            Enterprise-grade N-Tier architecture with clean separation of concerns, dependency injection, and proven design patterns for scalability.
                        </p>
                    </div>

                    <Divider 
                        orientation="left"
                        style={{ 
                            borderColor: 'rgba(255, 128, 0, 0.2)',
                            color: '#e8eaed',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        🎨 Frontend Stack
                    </Divider>
                    
                    <div className="modal-section-wrapper-frontend">
                        <div className="modal-badge-container">
                            <span className="modal-badge modal-badge-frontend-1">
                                ⚛️ React 18.3
                            </span>
                            <span className="modal-badge modal-badge-frontend-2">
                                🐜 Ant Design 5.26
                            </span>
                            <span className="modal-badge modal-badge-frontend-3">
                                📊 MUI X-Charts
                            </span>
                            <span className="modal-badge modal-badge-frontend-4">
                                🎨 Framer Motion
                            </span>
                            <span className="modal-badge modal-badge-frontend-5">
                                🌐 Axios
                            </span>
                            <span className="modal-badge modal-badge-frontend-6">
                                📱 React Responsive
                            </span>
                        </div>
                        <p className="modal-section-description">
                            Modern React ecosystem with component-based architecture, responsive design, smooth animations, and efficient data visualization.
                        </p>
                    </div>

                    <Divider 
                        orientation="left"
                        style={{ 
                            borderColor: 'rgba(255, 128, 0, 0.2)',
                            color: '#e8eaed',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        🚀 Backend Stack
                    </Divider>
                    
                    <div className="modal-section-wrapper-backend">
                        <div className="modal-badge-container">
                            <span className="modal-badge modal-badge-backend-1">
                                🔷 .NET 8.0 Web API
                            </span>
                            <span className="modal-badge modal-badge-backend-2">
                                🗄️ Entity Framework Core 8
                            </span>
                            <span className="modal-badge modal-badge-backend-3">
                                🗃️ SQL Server
                            </span>
                            <span className="modal-badge modal-badge-backend-4">
                                ⏰ Quartz.NET
                            </span>
                            <span className="modal-badge modal-badge-backend-5">
                                📝 Serilog + Seq
                            </span>
                            <span className="modal-badge modal-badge-backend-6">
                                📋 Swagger/OpenAPI
                            </span>
                        </div>
                        <p className="modal-section-description">
                            High-performance .NET backend with EF Core ORM, scheduled background jobs, distributed tracing, structured logging, and comprehensive API documentation.
                        </p>
                    </div>

                    <Divider 
                        orientation="left"
                        style={{ 
                            borderColor: 'rgba(255, 128, 0, 0.2)',
                            color: '#e8eaed',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        ✨ Key Features
                    </Divider>
                    
                    <div className={`modal-features-grid ${isMobile ? 'modal-features-grid-mobile' : 'modal-features-grid-desktop'}`}>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">⚡</span> Real-time Conversion
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">📊</span> Historical Rate Charts
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">💱</span> 150+ Currency Support
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">📰</span> Financial News Feed
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">📱</span> Responsive Design
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">🎨</span> Modern UI/UX
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">🔌</span> RESTful API
                        </div>
                        <div className="modal-feature-card">
                            <span className="modal-feature-icon">📈</span> Enterprise Scalability
                        </div>
                    </div>
                </div>
            </Modal>

            <Row className="page-title-container">
                <Typography.Title 
                    level={1} 
                    className={`page-title ${isMobile ? 'page-title-mobile' : 'page-title-desktop'}`}
                >
                    💱 Currency Converter
                </Typography.Title>
       
            </Row>

            {/* Eğer isDesktopOrLaptop ise düzenleme yapılır */}
            <Row className={isMobile ? 'homepage-row-mobile' : 'homepage-row-desktop'}>
                <Col span={isMobile ? 24 : 12}>
                    <CurrencyConverter onCurrencyChange={setCurrentCurrenciesCallback} />
                </Col>
                <Col
                    span={isMobile ? 24 : 12}
                    className="homepage-col-center"
                >
                    <GoogleChart currencyRates={currencyGraph} currentBaseCurrency={currentBaseCurrency} currentTargetCurrency={currentTargetCurrency}></GoogleChart>
                </Col>
                
            </Row>

      
            {isMobile ? (
                <Row gutter={[16, 16]} className="news-section-container-mobile">
                    <Col span={24}>
                        <CommonCurrenciesRates 
                            style={{ marginTop: "50vh" }} 
                            currentBaseCurrency={currentBaseCurrency} 
                            currentTargetCurrency={currentTargetCurrency} 
                        />
                    </Col>

                    <Typography.Title 
                        level={2} 
                        className="news-section-title news-section-title-mobile"
                    >
                        📰 Latest News
                    </Typography.Title>
                    <Col span={24}>
                        <NewsPage />
                    </Col>
                </Row>
            ) : (
                <>
                    <Row className="news-section-title-row">
                        <Typography.Title 
                            level={2} 
                            className="news-section-title news-section-title-desktop"
                        >
                            📰 Latest News
                        </Typography.Title>
                    </Row>

                    <Row gutter={[16, 16]} className="news-section-container-desktop">
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



