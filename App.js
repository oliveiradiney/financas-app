
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Text, View, StatusBar } from 'react-native';
import firebase from './src/services/firebaseConnection';
import { LogBox } from 'react-native';

import Routes from './src/routes';

export default function App() {

  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#131313' barStyle="light" />
      <Routes />
    </NavigationContainer>
  );
}

