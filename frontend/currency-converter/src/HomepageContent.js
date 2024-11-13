import './App.css';
import React from 'react';
import { Typography } from 'antd';
import CurrencyConverter from './CurrencyConverter';

function HomePageContent() {
    return (
        <div style={{ paddingInline: "8vw", paddingTop: "2vh" }}>

            <div>
                <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                    Converter
                </Typography.Title>

                <CurrencyConverter />

            </div>

            <div>
                <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                    News
                </Typography.Title>
            </div>


        </div>
    );
}

export default HomePageContent;

