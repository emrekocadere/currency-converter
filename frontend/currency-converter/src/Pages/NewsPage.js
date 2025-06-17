import { Card, Divider, Typography, Button, Flex, ConfigProvider } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { GetNewsFromDb, getPaginatedResults } from '../apiService';
import useResponsive from '../useResponsive';
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
        setNews((prevNews) => [...prevNews, ...response.data]);
    }

    useEffect(() => {
        Paginate();
    }, []);


    return (

        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'rgb(239,135,51)',
                    paddingLG: isMobile ? "2vw" : "24px"
                    // telephone    
                },
            }}
        >
            <div className='card-div'>
                {news.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        className='news-card'
                        style={{ padding: "0px" }}
                        cover={
                            <div className='news-card-img-div' style={{ display: "flex" }}>
                                <img
                                    className='news-card-img'
                                    alt={item.title || "News image"}

                                    src={item.image}
                                />
                            </div>
                        }
                        onClick={() => window.open(item.url, '_blank')}
                        ref={index === news.length - 1 ? lastCardRef : null}
                    >
                        <h4>{item.title}</h4>
                    </Card>
                ))}

            </div>
            <Button type="link" style={{ width: "10%" }} onClick={Paginate}>
                more
            </Button>
        </ConfigProvider>
    );
}
export default NewsPage;
