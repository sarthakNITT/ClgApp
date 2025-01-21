import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Register',
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false, // Hides the header for Login screen
      },
    },
    Register: {
      screen: RegisterScreen,
      options: {
        headerShown: false, // Hides the header for Register screen
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const AppNav = () => {
  return <Navigation />;
};

export default AppNav;
