import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import AppNavigator from './src/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return <AppNavigator />;
};

export default App;
