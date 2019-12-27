import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogIn from '../screens/LogIn'

export default createAppContainer(createSwitchNavigator(
  {
    LogIn: LogIn,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'LogIn',
  },
));