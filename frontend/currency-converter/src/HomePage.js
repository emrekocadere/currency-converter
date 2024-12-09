import './index.css';
import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';
import CurrencyConverter from './CurrencyConverter';
import GoogleChart from './GoogleLineChart';
import NewsPage from './Pages/NewsPage';
import CommonCurrenciesRates from './CommonCurrenciesRates';
import { useMediaQuery } from 'react-responsive'

export default function HomePage() {


    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

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



