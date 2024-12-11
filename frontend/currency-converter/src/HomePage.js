import './index.css';
import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';
import CurrencyConverter from './CurrencyConverter';
import GoogleChart from './GoogleLineChart';
import NewsPage from './Pages/NewsPage';
import CommonCurrenciesRates from './CommonCurrenciesRates';
import useResponsive from './useResponsive';

export default function HomePage() {
    const { isDesktopOrLaptop } = useResponsive();


    const [currencyGraph, setCurrencyGraph] = useState("HomePage");

    function fetchCurrencyData(currencyGraph) {
        setCurrencyGraph(
            currencyGraph

        );
        console.log(currencyGraph)
    }
    return (
        <div className='homePageDiv'>
            <Row>
                <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                    Converter
                </Typography.Title>
            </Row>

            {/* Eğer isDesktopOrLaptop ise düzenleme yapılır */}
            <Row gutter={[16, 16]} style={{ flexDirection: isDesktopOrLaptop ? 'row' : 'column' }}>
                <Col span={isDesktopOrLaptop ? 12 : 24}>
                    <CurrencyConverter sendCurrencyData={fetchCurrencyData} />
                </Col>
                <Col
                    span={isDesktopOrLaptop ? 12 : 24}
                    style={{ display: "flex", justifyContent: "center", marginTop: isDesktopOrLaptop ? "-7vh" : "0" }}
                >
                    <GoogleChart currencyRates={currencyGraph}></GoogleChart>
                </Col>
            </Row>

            <Row>
                <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                    News
                </Typography.Title>
            </Row>

            <Row gutter={[16, 16]} style={{ flexDirection: isDesktopOrLaptop ? 'row' : 'column' }}>
                <Col span={isDesktopOrLaptop ? 12 : 24}>
                    <NewsPage />
                </Col>
                <Col span={isDesktopOrLaptop ? 12 : 24}>
                    <CommonCurrenciesRates />
                </Col>
            </Row>
        </div>
    );
}



