import { Card, Divider, Typography, Button, Flex, ConfigProvider } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { getNews, getPaginatedResults } from '../services/api';
import { useResponsive } from '../shared/hooks/useResponsive';
import "../index.css"

const { Meta } = Card;

let pageNumber=0;
function NewsPage() {

    const lastCardRef = useRef(null);
    const { isMobile } = useResponsive();
    const [news, setNews] = useState([]);


    async function Paginate() {
        pageNumber++;
        let response = await getPaginatedResults(pageNumber);
        setNews((prevNews) => [...prevNews, ...response.data.value]);
    }

    useEffect(() => {
        Paginate();
    }, []);


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff8000',
                    paddingLG: isMobile ? "2vw" : "24px"
                },
            }}
        >
            <div className='card-div news-cards-container'>
                {news.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        className='news-card news-card-container news-card-horizontal'
                        onClick={() => window.open(item.url, '_blank')}
                        ref={index === news.length - 1 ? lastCardRef : null}
                    >
                        <div className="news-card-horizontal-layout">
                            <div className={`news-card-img-div news-card-cover-container ${isMobile ? 'news-card-cover-mobile' : 'news-card-cover-desktop'}`}>
                                <img
                                    className='news-card-img news-card-image'
                                    alt={item.title || "News image"}
                                    src={item.image}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/800x400/1a1f3a/ff8000?text=Financial+News';
                                    }}
                                />
                            </div>
                            <div className="news-card-content">
                                <h5
                                    
                                    className={`news-card-title ${isMobile ? 'news-card-title-mobile' : 'news-card-title-desktop'}`}
                                >
                                    {item.title}
                                </h5>
                                <div className="news-card-action-container">
                                    <span className="news-card-read-more">
                                        Read more →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            
            <div className="news-load-more-container">
                <Button 
                    type="primary"
                    size="large"
                    onClick={Paginate}
                    className="news-load-more-button"
                >
                    Load More News
                </Button>
            </div>
        </ConfigProvider>
    );
}
export default NewsPage;
