import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StatusBar} from 'react-native';
import {Login, Register, WelcomeScreen} from '../screens';

const OnBoardingNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <Stack.Navigator
        screenOptions={{
          animation: 'flip',
          headerShown: false,
        }}>
        <Stack.Screen name="WELCOME" component={WelcomeScreen} />
        <Stack.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="REGISTER" component={Register} />
      </Stack.Navigator>
    </>
  );
};
export default OnBoardingNavigation;
