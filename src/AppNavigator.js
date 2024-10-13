import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './normal/Splash';
import Parent from './normal/Parent';
import SearchPage from './Pages/SearchPage';
import HomePage from './Pages/HomePage';
import PropertyList from './Pages/PropertyList';
import PropertyDetailsPage from './Pages/PropertyDetailsPage';
import MobileNumber from './Pages/MobileNumber';
import OtpScreen from './Pages/OtpScreen';
import ScrollViewImage from './bottom/ScrollViewImage';
import ProfileScreen from './common/ProfileMenu';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MobileNumber"
          component={MobileNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
         {/* <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Parent"
          component={Parent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyList"
          component={PropertyList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetailsPage"
          component={PropertyDetailsPage}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="ScrollViewImage"
          component={ScrollViewImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
