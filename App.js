/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Secured from './src/components/Secured';
import Root from "./src/main";


export default class App extends Component<{}> {
  state = {
    userLocation: null,
    usersPlaces: [],
    isLoggedIn: false
  };
  render() {
    
    return this.renderMap();
  }

  renderMap(){
    return (
      <View style={styles.container}>
        <Root {...this.props}/>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
