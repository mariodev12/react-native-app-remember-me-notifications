/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Index from './app/Index'

export default class formsApp extends Component {
  renderScene(route, navigator){
    return (
      <Index />
    )
  }
  render() {
    return (
      <Navigator 
        renderScene={this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('formsApp', () => formsApp);
