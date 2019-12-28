import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LogIn from '../screens/LogIn'
import HomeScreen from '../screens/HomeScreen'
import Problem from '../screens/Problem'
import Profile from '../screens/Profile'

export default createAppContainer(createSwitchNavigator(
  {
    LogIn: LogIn,
    Home: HomeScreen,
    Problem: Problem,
    Profile: Profile,
  },
  {
    initialRouteName: 'Profile',
  },
));