import { Card, Divider, Typography, Button, Flex, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetNewsFromDb } from '../apiService';
import "../index.css"

const { Meta } = Card;


function NewsPage() {

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
                    colorPrimary: 'rgb(239,135,51)' // 
                }
            }}
        >
            <div className='cardDiv'>

                {news.map((item, index) => (

                    <Card
                        href
                        key={index}
                        hoverable
                        className='newsCard'

                        cover={
                            <div  className='newsCardImgDiv' style={{display:"flex"}}>
                                <img
                                className='newsCardImg'
                                    alt={item.title || "News image"}

                                    src={item.image}
                                />
                            </div>
                        }
                    >

                        <Meta
                            title={<Typography.Paragraph style={{ marginBottom: 0, whiteSpace: 'normal' }}>
                                {item.title}
                            </Typography.Paragraph>}
                            description={item.description.slice(0, 140)} />

                        <Divider style={{ margin: "10px" }}></Divider>

                        <div style={{ width: "28vw", height:"3.5vh",display: "flex", justifyContent: "flex-end",alignItems:"flex-end" }}>
                            <Button href={item.url} >
                                Read
                            </Button>
                        </div>


                    </Card>

                ))}

            </div>
        </ConfigProvider>



    );
}

export default NewsPage;
