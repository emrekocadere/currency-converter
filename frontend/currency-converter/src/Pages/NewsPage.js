import { Card, Divider, Typography, Button, Flex, ConfigProvider } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { GetNewsFromDb, GetPaginatedResultsAsync } from '../apiService';
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
        let response = await GetPaginatedResultsAsync(pageNumber);
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
            <div className='cardDiv'>
                {news.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        className='newsCard'
                        style={{ padding: "0px" }}
                        cover={
                            <div className='newsCardImgDiv' style={{ display: "flex" }}>
                                <img
                                    className='newsCardImg'
                                    alt={item.title || "News image"}

                                    src={item.image}
                                />
                            </div>
                        }
                        onClick={() => window.open(item.url, '_blank')}
                        ref={index === news.length - 1 ? lastCardRef : null}
                    >
                        <Meta

                            title={<p className='newsCardTitle'> {item.title}</p>}
                            description={<div className='newsCardDescription'>{item.description.slice(0, isMobile ? 40 : 140)}</div>} />
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
