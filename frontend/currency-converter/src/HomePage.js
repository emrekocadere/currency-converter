import './index.css';
import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';
import CurrencyConverter from './CurrencyConverter';
import GoogleChart from './GoogleLineChart';
import NewsPage from './Pages/NewsPage';
import CommonCurrenciesRates from './CommonCurrenciesRates';
import useResponsive from './useResponsive';

export default function HomePage() {
    const { isDesktop,isMobile } = useResponsive();

    const [currentBaseCurrency, setCurrentBaseCurrency] = useState("USD");
    const [currentTargetCurrency, setCurrentTargetCurrency] = useState("EUR");
    const [currencyGraph, setCurrencyGraph] = useState("HomePage");

    function setCurrentCurrenciesCallback(currencies) {
        setCurrentBaseCurrency(currencies.baseCurrency);
        setCurrentTargetCurrency(currencies.targetCurrency);
    }

    return (
        <div className='homePageDiv'>
            <Row>
                <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                    Converter
                </Typography.Title>
            </Row>

            {/* Eğer isDesktopOrLaptop ise düzenleme yapılır */}
            <Row gutter={[16, 16]} style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                <Col span={isDesktop ? 12 : 24}>
                    <CurrencyConverter onCurrencyChange={setCurrentCurrenciesCallback} />
                </Col>
                <Col
                    span={isDesktop ? 12 : 24}
                    style={{ display: "flex", justifyContent: "center", marginTop: isDesktop ? "-7vh" : "0" }}
                >
                    <GoogleChart currencyRates={currencyGraph} currentBaseCurrency={currentBaseCurrency} currentTargetCurrency={currentTargetCurrency}></GoogleChart>
                </Col>
            </Row>

            <Row>
                <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                    News
                </Typography.Title>
            </Row>

            <Row gutter={[16, 16]} style={{ flexDirection: isDesktop ? 'row' : 'column' }}>
                <Col span={isDesktop ? 12 : 24}>
                    <NewsPage />
                </Col>
                <Col span={isDesktop ? 12 : 24}>
                    <CommonCurrenciesRates currentBaseCurrency={currentBaseCurrency} currentTargetCurrency={currentTargetCurrency}/>
                </Col>
            </Row>
        </div>
    );
}



