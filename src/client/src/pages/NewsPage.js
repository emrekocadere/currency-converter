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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);


    async function Paginate() {
        if (loading || !hasMore) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            pageNumber++;
            console.log('Fetching news page:', pageNumber);
            
            let response = await getPaginatedResults(pageNumber);
            
            if (!response || !response.data) {
                setError('No response from server. Please try again.');
                pageNumber--;
                return;
            }

            const newsData = response.data?.value || response.data;
            
            if (newsData.length === 0) {
                setHasMore(false);
                if (news.length === 0) {
                    setError('No news available at the moment');
                }
                return;
            }

            setNews((prevNews) => [...prevNews, ...newsData]);
            
            // If returned less than expected (e.g., < 6), might be last page
            if (newsData.length < 6) {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Error fetching news:', err);
            const errorMessage = err.message || 'Failed to load news. Please try again.';
            setError(errorMessage);
            pageNumber--; // Revert page number on error
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
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
            {initialLoad && loading ? (
                <div className="news-loading-container">
                    <div className="news-spinner"></div>
                    Loading news...
                </div>
            ) : error && news.length === 0 ? (
                <div className="news-error-container">
                    <div className="news-error-card">
                        <div className="news-error-icon">⚠️</div>
                        <div className="news-error-message">{error}</div>
                        <Button 
                            type="primary" 
                            onClick={() => {
                                setError(null);
                                pageNumber = 0;
                                setNews([]);
                                setHasMore(true);
                                Paginate();
                            }}
                            className="news-error-retry-button"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            ) : (
                <>
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
            
            {error && news.length > 0 && (
                <div className="news-error-banner">
                    <div className="news-error-banner-content">
                        ⚠️ {error}
                    </div>
                </div>
            )}

            <div className="news-load-more-container">
                <Button 
                    type="primary"
                    size="large"
                    onClick={Paginate}
                    className="news-load-more-button"
                    loading={loading}
                    disabled={loading || !hasMore}
                >
                    {loading ? 'Loading...' : hasMore ? 'Load More News' : 'No More News'}
                </Button>
            </div>
            </>
            )}
        </ConfigProvider>
    );
}
export default NewsPage;
