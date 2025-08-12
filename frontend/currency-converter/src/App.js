import './App.css';
import React, { useEffect } from 'react';
import { getUserIp, saveUserLocation } from './apiService';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import HomePage from './HomePage';
function App() {

  async function getUserIp() {
    let response = await getUserIp();
    let userLocationInfo = {
      IpAddress: response.data.ip,
      Country: response.data.country_name,
      City: response.data.city,
    };
    saveUserLocationAsync(userLocationInfo);
  }

  async function saveUserLocationAsync(value) {
    let response = await saveUserLocation(value);
  }

  // useEffect hook'u doğru kullanımı
  useEffect(() => {
    // GetUserIp();
    // SaveUserLocationAsync();
  }, []);

  return (
    <div>

      <CustomHeader />

      <HomePage />

      <CustomFooter />


    </div>

  );
}

export default App;
