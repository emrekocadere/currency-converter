import logo from './logo.svg';
import './App.css';
import CurrencyConverter from './CurrencyConverter';
import { Flex, Layout } from 'antd';
import NewsCard from './NewsCard';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import HomePageContent from './HomepageContent';
import NewsPage from './Pages/NewsPage';
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div>

        <CustomHeader />
      <NewsPage></NewsPage>
        <CustomFooter />
      

    </div>

  );
}

export default App;
