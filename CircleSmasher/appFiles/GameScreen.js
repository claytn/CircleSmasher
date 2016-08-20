import React, { Component } from 'react';
import {

  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator
} from 'react-native';
import Dimensions from 'Dimensions';
import GameOver from './GameOver.js';
import realm from './realm.js';
import Emoji from 'react-native-emoji';


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
const CIRC_SIZE = height/8;

//let oldColorDatabase  = ['#e24e42','#328cc1','#eb6e80','#94618e','#f2d388','#93c178','#f19f4d','#88d317','#d48cf8','#155765', '#1fb58f','#99ced4','#cda34f'];
let colorDatabase = ['#BCCF02'/*lime*/,'#9B539C'/*purple*/,'#DE8642'/*orange*/,'#73C5E1'/*bright blue*/,
                     '#C0B283' /*pale gold*/,'#5BB12F'/*green*/,'#EE4B3E'/*red*/,'#E9BC1B'/*dull yellow*/,'#EB65A0'/*pink*/,
                     '#FC4A1A'/*vermilion*/, '#4ABDAC'/*fresh blue*/,  '#373737'/*charcoal*/,
                     '#EEAA7B'/*pale orange*/,'#A239CA'/*fuscia*/, '#4717F6'/*jewel blue*/, '#6D7993'/*lavender*/,
                     '#3CC47C'/*electric green*/, '#B82601'/*ember red*/,'#812772'/*posy pink*/,'#062F4F'/*ink blue*/,
                    ];

let emojiDatabase = ['smiling_imp','coffee','relaxed','gem','grinning','hankey','heart_eyes','muscle','sunglasses','see_no_evil',
                     'couple','skull','ghost','100','fire','sweat_smile','laughing','sweat','angry',
                     'cry','triumph','grimacing','mask','smile_cat','face_with_head_bandage','nerd_face',
                     'zipper_mouth_face','robot_face','the_horns','+1','crown','rage','eyeglasses','necktie','imp','stuck_out_tongue_winking_eye',
                     'pouting_cat',
                    ];

let sportsDatabase = ['football','trophy','skier','tennis','soccer','basketball','golfer','volleyball','bowling','baseball'
                      ,'ice_hockey_stick_and_puck','table_tennis_paddle_and_ball','racing_car','golf','weight_lifter',
                      'swimmer','rugby_football','sports_medal','surfer','snowboarder','runner','horse_racing',
                    ];

let currentScore = 0;

class GameBoard extends Component{

  constructor(){
    super();
    this.state= {
      score: 0,
      circleLeft: (Math.random() * (width - CIRC_SIZE)),
      circleTop: (Math.random() * (height - (CIRC_SIZE*3))),
      circleColor: this.getColor()
    }
  }

  getColor(){
    if(realm.objects('SelectedPack')[0].pack === 'circles'){
    return colorDatabase[currentScore%colorDatabase.length];
    }
    else if(realm.objects('SelectedPack')[0].pack === 'emojis'){
      return emojiDatabase[currentScore%emojiDatabase.length];
    }
    else if(realm.objects('SelectedPack')[0].pack === 'sports'){
      return sportsDatabase[currentScore%sportsDatabase.length];
    }
  }

  renderNewCircle(){
    currentScore++;
    this.setState({
      circleColor: this.getColor(),
      score: ++this.state.score,
      circleLeft: (Math.random() * (width - CIRC_SIZE)),
      circleTop: (Math.random() * (height - (CIRC_SIZE*3))),
    });
  }

  render(){
    if(realm.objects('SelectedPack')[0].pack === 'circles'){
      return(
        <View style={styles.boardContainer}>
        <Text style={styles.onScreenScore}>{this.state.score}</Text>
        <TouchableHighlight underlayColor={this.state.circleColor} onPress={(this.props.time == 0)? ()=>{} :this.renderNewCircle.bind(this)} style={[styles.circle, {left: this.state.circleLeft, top: this.state.circleTop, backgroundColor: this.state.circleColor}]} >
          <View></View>
        </TouchableHighlight>
        </View>

      );
    }
    else if(realm.objects('SelectedPack')[0].pack === 'emojis'){
      return(
        <View style={styles.boardContainer}>
        <Text style={styles.onScreenScore}>{this.state.score}</Text>
        <TouchableHighlight underlayColor='transparent' onPress={(this.props.time == 0)? ()=>{} :this.renderNewCircle.bind(this)} style={[styles.emojiWrapper,{left: this.state.circleLeft, top: this.state.circleTop}]} >
          <Text style={styles.emoji}><Emoji name={this.state.circleColor} /></Text>
        </TouchableHighlight>
        </View>
      )
    }
    else if(realm.objects('SelectedPack')[0].pack === 'sports'){
      return(
        <View style={styles.boardContainer}>
        <Text style={styles.onScreenScore}>{this.state.score}</Text>
        <TouchableHighlight underlayColor='transparent' onPress={(this.props.time == 0)? ()=>{} :this.renderNewCircle.bind(this)} style={[styles.emojiWrapper,{left: this.state.circleLeft, top: this.state.circleTop}]} >
          <Text style={styles.emoji}><Emoji name={this.state.circleColor} /></Text>
        </TouchableHighlight>
        </View>
      );
    }

  }
}
//

class GameScreen extends Component{

  constructor(){
    super();
    this.state= {
      gameHasStarted:false,
      startingCountDown: 3,
      gameOver: true,
      gameClock: 30,
    }
  }

  runGameClock(){
    var self = this;
    setTimeout(()=>{
      if(this.state.gameClock > 0){
      this.setState({gameClock: this.state.gameClock - 1});
      this.runGameClock();
      }
      else{
        this.setState({gameOver: true});
        this.props.replaceRoute({
          component: GameOver,
          hideNavigationBar: true,
          noStatusBar: true,
          trans: true,
          sceneConfig: Navigator.SceneConfigs.FadeAndroid,
          passProps:{
            score: currentScore,
            noise: self.props.data,
          }
        });
      }
    }, 1000);

  }



  countDown(){
      setTimeout(()=>{
        if(this.state.startingCountDown > 1){
        this.setState({startingCountDown: this.state.startingCountDown -1});
        this.countDown();
        }
        else{

          this.setState({
              gameHasStarted: true,
          });

        }
      },1000);
  }


  componentDidMount(){
    currentScore = 0;
    this.countDown();
  }

  render(){
    if(!this.state.gameHasStarted){
        return(
        <View style={styles.container}>
          <Text style={[styles.startingCountDown, {color: colorDatabase[Math.floor(Math.random()*colorDatabase.length)]}]}>{this.state.startingCountDown}</Text>
        </View>
        );
    }


    else{
      if(this.state.gameClock == 30){
      this.runGameClock();
      }
      return(
      <View style={styles.gameSessionContainer}>
      <View style={styles.timer}>
        <Text style={styles.gameClock}>Time: {this.state.gameClock}</Text>
      </View>
      <GameBoard time={this.state.gameClock}/>
      </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  //GameBoard
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
    elevation: 2,
  },
  emojiWrapper:{
    position: 'absolute',
  },
  emoji:{
    color: 'white',
    fontSize: CIRC_SIZE,
  },


  //GameScreen
  container:{
    flex: 1,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameSessionContainer:{
    flex: 1,
    backgroundColor: '#E0E0E0',

  },

  startingCountDown:{
    fontSize: 85,
    fontWeight: 'bold',
  },

  timer:{
    flex: 1,
  },

  gameClock:{
    position: 'absolute',
    top:15,
    left: 15,
    color: '#e14658',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: width/3,
  },

});



export default GameScreen;
