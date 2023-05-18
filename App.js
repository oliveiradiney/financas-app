
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StatusBar } from 'react-native';
import AuthProvider from './src/contexts/auth';
import { LogBox } from 'react-native';

import Routes from './src/routes';

export default function App() {

  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#131313' barStyle="light" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

