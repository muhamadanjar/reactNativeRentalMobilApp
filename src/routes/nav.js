import React from 'react';
import { Text, Animated, Easing, StyleSheet, View } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Header, Left, Body, Right, Button} from "native-base";
import HomeContainer from "./Home/container/HomeContainer";
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";
import LoginContainer from "./Login/container/LoginContainer";
import ReduxNavigation from "./Navigation/container/ReduxNavigation";
import DrawerContainer from "./Navigation/components/DrawerContainer";
//import ServicesContainer from "./Services/container/ServiceContainer";

import Icon from "react-native-vector-icons/FontAwesome";


const styles = StyleSheet.create({
	icon:{
		color:"#fff",
		fontSize:20
	},
	headerText:{
		color:"#fff",
		fontSize:14
	},
	logo:{
		width:50,
		height:50
	}

});

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const drawerButton = (navigation) =>{
  <Left>
				<Button transparent
          onPress={() => {
              // Coming soon: navigation.navigate('DrawerToggle')
              // https://github.com/react-community/react-navigation/pull/2492
              if (navigation.state.index === 0) {
                navigation.navigate('DrawerOpen')
              } else {
                navigation.navigate('DrawerClose')
              }
            }
          }
        >
					<Icon name="bars" style={styles.icon} />
				</Button>
	</Left>
}
      
const DrawerStack = DrawerNavigator({
  screen1: { screen: HomeContainer },
  screen2: { screen: HomeContainer },
  //services: { screen: ServiceContainer },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer
})
const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack }
  }, {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#4C3E54'},
      title: 'Welcome!',
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation),
      //headerRight: drawerButton(navigation)
    })
})
// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginContainer },
  signupScreen: { screen: LoginContainer },
  forgottenPasswordScreen: { screen: LoginContainer, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#E73536'},
    title: 'You are not logged in',
    headerTintColor: 'white'
  }
})
// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: DrawerNavigation },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
})

export default PrimaryNav