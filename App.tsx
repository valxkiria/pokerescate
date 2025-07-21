import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import LoadingScreen from './src/screens/loading';

import store from './src/store';

import { loadFonts } from './src/global/fonts';

import { NavigationContainer } from "@react-navigation/native"
import TabNavigator from './src/navigation/tabNavigation';

export default function App() {
  console.log('App')
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAllFonts();
  }, []);

  if (!fontsLoaded) {
    return (<LoadingScreen/>)
  }

  return (
    <Provider store = {store}>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

