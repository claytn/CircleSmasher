import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';
import realm from './realm.js';

class GameOver extends Component{

  getLowest(){
    var lowest = realm.objects('HighScores')[0];
    for(var i = 1; i < realm.objects('HighScores').length; i++){
      if(realm.objects('HighScores')[i].score < lowest.score){
        lowest = realm.objects('HighScores')[i];
      }
    }
    return lowest;
  }

  replaceLowestScore(){
    var low = this.getLowest();
    realm.write(()=>{
       low.score = this.props.score;
    });



  }

  render(){
    console.log(this.getLowest().score);
    if(this.props.score > this.getLowest().score){
      this.replaceLowestScore();
      return(
        <Text>Trophy for {this.props.score}</Text>
      );
    }
    return(
      <Text> You fuckin suck. {this.props.score} </Text>
    );
  }
}


export default GameOver;
