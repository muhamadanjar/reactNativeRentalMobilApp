import React from 'react';
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import HomeContainer from "./Home/container/HomeContainer";
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";
import Login from "../components/Login";
const noTransitionConfig = () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
});

const PrimaryNav = StackNavigator({
    loginStack: { screen: Login },
    drawerStack: { screen: HomeContainer }
  }, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
  })
  
  export default PrimaryNav