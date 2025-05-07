import './App.css';
import React, { useState, useEffect } from 'react';
import { Flex, Layout } from 'antd';
import { getUserIp, saveUserLocation } from './apiService';
import CustomFooter from './CustomFooter';
import CustomHeader from './CustomHeader';
import HomePage from './HomePage';
function App() {

  async function GetUserIp() {
    let response = await getUserIp()
    let userLocationInfo = {
      IpAddress: response.data.ip,
      Country: response.data.country_name,
      City: response.data.city,
    }
    SaveUserLocation(userLocationInfo)
  }

  async function SaveUserLocation(value) {
    let response = await saveUserLocation(value)
  }

  //hooklar fonksiyon içinde kullanılır
  useState(() => {
   // GetUserIp();
 //   SaveUserLocationAsync();

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
