/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import GameMenu from './appFiles/GameMenu.js';
import Router from 'react-native-simple-router';
const FIRST_ROUTE =  {
    component: GameMenu,
    hideNavigationBar: true,
    noStatusBar: true,
    trans: true,
}

class CircleSmasher extends Component {
  render() {
    return (
      <Router firstRoute={FIRST_ROUTE}  />
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('CircleSmasher', () => CircleSmasher);
