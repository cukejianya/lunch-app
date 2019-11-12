import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen'
import SearchScreen from '../screens/SearchScreen'
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    App: MainTabNavigator,
    Auth: LoginScreen,
    Search: SearchScreen,
  }, {
    initialRouteName: 'Search',
  })
);
