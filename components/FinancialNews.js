import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/FinancialNews.module.css'; 

const API_KEY = ' 6WOCLB6TZWWV8TFF'; 

const FinancialNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFinancialNews = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'NEWS_SENTIMENT',
            tickers: 'AAPL,TSLA,MSFT', // You can customize this
            apikey: API_KEY,
          },
        });

        if (response.data && response.data.feed) {
          setNews(response.data.feed);
        } else {
          setError('No news data available.');
        }
      } catch (err) {
        console.error('Error fetching financial news:', err);
        setError('Failed to load news.');
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialNews();
  }, []);

  const getSentimentEmoji = (score) => {
    if (score > 0.2) return '😊 Positive';
    if (score < -0.2) return '😞 Negative';
    return '😐 Neutral';
  };

  return (
    <div className={styles.container}>
      <h2>📰 Financial News & Sentiment</h2>
      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && news.length > 0 && (
        <div className={styles.newsList}>
          {news.slice(0, 5).map((item, index) => (
            <div key={index} className={styles.newsItem}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p className={styles.sentiment}>
                Sentiment: {getSentimentEmoji(item.overall_sentiment_score)}
              </p>
              <small>
                Source: {item.source} | Published:{' '}
                {new Date(item.time_published.slice(0, 8)).toDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialNews;
