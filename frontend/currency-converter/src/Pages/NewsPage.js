import { Card, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { GetNewsFromDb } from '../apiService';

const { Meta } = Card;


function NewsPage() {

    const [news, setNews] = useState([]);
    useEffect(() => {
        async function fetchNews() {
            let response = await GetNewsFromDb();
            setNews(response)
        }
        fetchNews(); // Asenkron fonksiyonu çağırın
    }, []);


    return (
        <div style={{ display: "flex", flexDirection: "column", paddingInline: "8vw", paddingTop: "2vh" }}>
            <Typography.Title level={2} style={{ paddingBottom: "1vh" }}>
                News
            </Typography.Title>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {news.map((item, index) => (
                    <Card
                        key={index}
                        hoverable
                        style={{
                            width: "50%",
                            height: "18vh",
                            display: "flex",
                            flexDirection: "row",
                            background: "rgb(246, 246, 246)",
                            marginBottom: "1vh" // Her kart arasında boşluk bırakmak için
                        }}
                        cover={
                            <div style={{ height: "18vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img
                                    alt={item.title || "News image"}
                                    style={{
                                        height: "15vh",
                                        width: "9vw",
                                        marginLeft: "10px",
                                        borderRadius: "10%",
                                        objectFit: "cover"
                                    }}
                                    src={item.imageUrl || item.image} // Varsayılan bir görsel ekledim
                                />
                            </div>
                        }
                    >
                        <Meta title={<Typography.Paragraph style={{ marginBottom: 0, whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            {item.title}
                        </Typography.Paragraph>} description={item.description} />
                    </Card>
                ))}
            </div>


        </div>

    );
}

export default NewsPage;
