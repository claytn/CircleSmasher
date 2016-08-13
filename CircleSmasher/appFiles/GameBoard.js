import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
const CIRC_SIZE = height/8;
const colorDatabase  = ['#e24e42','#328cc1','#eb6e80','#94618e','#f2d388','#93c178','#f19f4d','#88d317','#d48cf8','#155765', '#1fb58f','#99ced4','#cda34f'];

class GameBoard extends Component{

  constructor(){
    super();
    this.state= {
      score: 0,
      circleLeft: 100,
      circleTop: 100,
      circleColor: 'blue'
    }
  }

  getColor(){
    return colorDatabase[Math.floor(Math.random() * colorDatabase.length)];
  }

  renderNewCircle(){
    currentScore++;
    this.setState({
      circleColor: this.getColor(),
      score: ++this.state.score,
      circleLeft: (Math.random() * (width - CIRC_SIZE)),
      circleTop: (Math.random() * (height - CIRC_SIZE)),
    });
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.onScreenScore}>{this.state.score}</Text>
      <TouchableHighlight style={[styles.circle, {left: this.state.circleLeft, top: this.state.circleTop, backgroundColor: this.state.circleColor}]} onPress={this.renderNewCircle.bind(this)}>
        <View></View>
      </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  boardContainer:{
    flex: 11,
    backgroundColor: '#E0E0E0',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  onScreenScore:{
    fontSize: 50,
  },
  circle:{
    position: 'absolute',
    width: CIRC_SIZE,
    height: CIRC_SIZE,
    borderRadius: CIRC_SIZE,
  },

});

module.exports =  GameBoard;
