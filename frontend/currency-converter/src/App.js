import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import CurrencyConverter from './CurrencyConverter';
import { Flex, Layout } from 'antd';
import NewsCard from './NewsCard';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import HomePage from './HomePage';
import NewsPage from './Pages/NewsPage';
const { Header, Footer, Sider, Content } = Layout;
function App() {

  const [page, setPage] = useState("HomePage");


  useState(() => {

  }, [page]);

  return (
    <div>

      <CustomHeader />
      
      {page === "HomePage" ? <HomePage /> :  <NewsPage /> }

      <CustomFooter />


    </div>

  );
}

export default App;
