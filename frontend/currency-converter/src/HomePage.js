import './index.css';
import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';
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

    function setCurrentCurrenciesCallback(currencies) {
        setCurrentBaseCurrency(currencies.baseCurrency);
        setCurrentTargetCurrency(currencies.targetCurrency);
    }

    return (
        <div className='home-page-div'>
            <Row>
                <h2  style={{ paddingBottom: "1vh" }}>
                    Converter
                </h2>
            </Row>

            {/* Eğer isDesktopOrLaptop ise düzenleme yapılır */}
            <Row gutter={[16, 16]} style={{ flexDirection: isMobile ? 'column' : 'row' }}>
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

                    <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
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



