import { Card, Divider, Typography, Button, Flex, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetNewsFromDb } from '../apiService';
import useResponsive from '../useResponsive';
import "../index.css"

const { Meta } = Card;


function NewsPage() {

    const { isMobile } = useResponsive();
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchNews() {
            let response = await GetNewsFromDb();
            setNews(response)
        }
        fetchNews();
    }, []);

    return (

        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'rgb(239,135,51)',
                    paddingLG: isMobile ? "2vw":  "24px"
                   // telephone    
                },
            }}
        >
            <div className='cardDiv'>
                {news.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        className='newsCard'
                        style={{padding:"0px"}}
                        cover={
                            <div  className='newsCardImgDiv' style={{display:"flex"}}>
                                <img
                                className='newsCardImg'
                                    alt={item.title || "News image"}

                                    src={item.image}
                                />
                            </div>
                        }
                        onClick={() =>window.open(item.url, '_blank')}
                    >
                        <Meta
                    
                            title={<p className='newsCardTitle'> {item.title}</p>}
                            description={<div className='newsCardDescription'>{item.description.slice(0, isMobile ? 40 : 140)}</div>} />
                    </Card>
                ))}
            </div>
        </ConfigProvider>
    );
}
export default NewsPage;
