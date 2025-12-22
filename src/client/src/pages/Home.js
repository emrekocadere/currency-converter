import '../index.css';
import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';
import CurrencyConverter from '../features/converter/CurrencyConverter';
import CurrencyChart from '../features/chart/CurrencyChart';
import WelcomeModal from '../features/welcome/WelcomeModal';
import NewsPage from './NewsPage';
import CommonCurrenciesRates from '../features/rates/CommonCurrenciesRates';
import { useResponsive } from '../shared/hooks/useResponsive';

export default function HomePage() {
    const { isDesktop, isMobile, isTablet } = useResponsive();

    const [currentBaseCurrency, setCurrentBaseCurrency] = useState("AUD");
    const [currentTargetCurrency, setCurrentTargetCurrency] = useState("CAD");
    const [currencyGraph, setCurrencyGraph] = useState("HomePage");
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        setIsModalVisible(true);
    }, []);

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    function setCurrentCurrenciesCallback(currencies) {
        setCurrentBaseCurrency(currencies.baseCurrency);
        setCurrentTargetCurrency(currencies.targetCurrency);
    }

    return (
        <div className='home-page-div'>
            <WelcomeModal isVisible={isModalVisible} onClose={handleModalClose} />

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
                    <CurrencyChart currencyRates={currencyGraph} currentBaseCurrency={currentBaseCurrency} currentTargetCurrency={currentTargetCurrency}></CurrencyChart>
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
                        Latest News
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
                            Latest News
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



