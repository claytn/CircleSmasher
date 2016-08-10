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

class CircleSmasher extends Component {
  render() {
    return (
      <GameMenu />
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('CircleSmasher', () => CircleSmasher);
