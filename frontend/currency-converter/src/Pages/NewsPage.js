import { Card, Divider, Typography, Button, Flex } from 'antd';
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
        fetchNews(); 
    }, []);


    return (
      

            <div style={{ display: "flex", flexDirection: "column" }}>

                {news.map((item, index) => (

                    <Card
                        href
                        key={index}
                        hoverable

                        style={{
                            width: "100%",
                            height: "18vh",
                            display: "flex",
                            flexDirection: "row",
                            background: "rgb(246, 246, 246)",
                            marginBottom: "1vh" 
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
                                    src={item.imageUrl || item.image}
                                />
                            </div>
                        }
                    >

                        <Meta title={<Typography.Paragraph style={{ marginBottom: 0, whiteSpace: 'normal' }}>
                            {item.title}
                        </Typography.Paragraph>} description={item.description} />
                        <Divider style={{margin:"10px"}}></Divider>
                        <div style={{width:"28vw",  display:"flex",justifyContent:"flex-end"}}>
                            <Button href={item.url} >
                                Read
                            </Button>
                        </div>


                    </Card>

                ))}

            </div>


 

    );
}

export default NewsPage;
