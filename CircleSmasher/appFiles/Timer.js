import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class Timer extends Component{
  constructor(){
    super();
    this.state = {
      
    }
  }


  render(){
    return(
      <Text style={styles.gameClock}>Time: {this.state.gameClock}</Text>
    );
  }

}

const styles = StyleSheet.create({

})
