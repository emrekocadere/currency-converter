import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

function NewsCard() {
    return (
        <div >
            <Card
                className='newsCard'
                hoverable
                cover={<img style={{ width: "12.5vw", height: "20vh", objectFit: "cover" }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat " description="www.instagram.com" />
            </Card>
        </div>
    );
}

export default NewsCard;
