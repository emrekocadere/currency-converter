import './App.css';
import React from 'react';
import { Typography } from 'antd';
import CurrencyConverter from './CurrencyConverter';
import GoogleChart from './GoogleLineChart';

function HomePageContent() {
    return (
        <div style={{ paddingInline: "8vw", paddingTop: "2vh" }}>

            <div style={{display:"flex",flexDirection:"row"}}>
                <div >
                    <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                        Converter
                    </Typography.Title>

                    <CurrencyConverter />

                </div>
                <div style={{paddingLeft:"100px",width:"100vw"}}>
                <GoogleChart></GoogleChart>
                </div>
               
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

