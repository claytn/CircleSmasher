import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import GameMenu from './GameMenu.js';
import Dimensions from 'Dimensions';
import realm from './realm.js';
import Icon from 'react-native-vector-icons/Ionicons';

class GameOver extends Component{


  replaceLowestScore(){
    realm.write(()=>{
       realm.objects('HighScores')[0].score = this.props.score;
    });
  }

  restartGame(){
    this.props.toRoute({
      component: GameMenu,
      hideNavigationBar: true,
      noStatusBar: true,
      trans: true,
    });
  }

  render(){
    //console.log(this.getLowest().score);
    if(this.props.score > realm.objects('HighScores')[0].score){
      this.replaceLowestScore();
      return(
        <View style={styles.container}>
          <Icon name='md-trophy' size={160} />
          <Text style={styles.score}>{this.props.score}</Text>
          <Text>Your Score is on the Leaderboard!</Text>
          <TouchableHighlight style={styles.reset} onPress={this.restartGame.bind(this)}>
            <Text>Tap to Restart</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return(
      <View style={styles.container}>

      <Text style={styles.score}>{this.props.score}</Text>
      <TouchableHighlight style={styles.reset} onPress={this.restartGame.bind(this)}>
        <Text>Tap to Restart</Text>
      </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  },
  score:{
    fontSize: 50,

  },
  reset:{
    marginTop: 40,
  }
})


export default GameOver;
