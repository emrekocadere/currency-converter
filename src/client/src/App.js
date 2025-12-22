import './App.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { getUserIp, saveUserLocation } from './services/api';
import MainLayout from './shared/layout/MainLayout';
import Home from './pages/Home';

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

  useEffect(() => {
  }, []);

  return (
    <Provider store={store}>
      <MainLayout>
        <Home />
      </MainLayout>
    </Provider>
  );
}

export default App;
