import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContactScreen from '../screens/ContactScreen'
import LoginScreen from '../screens/LoginScreen'
import SearchScreen from '../screens/SearchScreen'
import MapScreen from '../screens/MapScreen'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Contact"
      >
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name='Contact' component={ContactScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

