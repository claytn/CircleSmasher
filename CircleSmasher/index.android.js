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
import realm from './appFiles/realm.js';
import Sound from 'react-native-sound';
const FIRST_ROUTE =  {
    component: GameMenu,
    hideNavigationBar: true,
    noStatusBar: true,
    trans: true,
}

class CircleSmasher extends Component {
  constructor(){
    super();
    this.boop = null;
  }

  componentWillMount(){

    this.boop = new Sound('bgmusic.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this.boop.getDuration() +
            'number of channels: ' + this.boop.getNumberOfChannels());
      }
    });

  }

  render() {

    return (
      <Router firstRoute={{
        component: GameMenu,
        hideNavigationBar: true,
        noStatusBar: true,
        trans: true,
        data: this.boop,
      }} />
    );
  }
}

const styles = StyleSheet.create({

});

export default CircleSmasher;

AppRegistry.registerComponent('CircleSmasher', () => CircleSmasher);
