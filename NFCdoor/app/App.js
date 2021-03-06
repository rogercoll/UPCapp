
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider, connect} from 'react-redux';
import {StackNavigator} from 'react-navigation';
import Routes from './config/routes';
import getStore from './store';
import {
	createNavigationPropConstructor,
	initializeListeners
  } from 'react-navigation-redux-helpers';



const Navigator = StackNavigator(Routes, {
		navigationOptions:{
			gesturesEnabled: false
	}
})




export default class App extends Component {
  render() {
    return (
      <Navigator
	  />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
