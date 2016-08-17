import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator,
  Animated,
} from 'react-native';
import GameMenu from './GameMenu.js';
import Dimensions from 'Dimensions';
import realm from './realm.js';
import Icon from 'react-native-vector-icons/Ionicons';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
const CIRC_SIZE = height/8;
var count = 0;
let colorDatabase = ['#BCCF02'/*lime*/,'#9B539C'/*purple*/,'#DE8642'/*orange*/,'#73C5E1'/*bright blue*/,
                     '#5BB12F'/*green*/,'#EE4B3E'/*red*/,'#E9BC1B'/*dull yellow*/,'#EB65A0'/*pink*/,
                    ];
class GameOver extends Component{

  constructor(){
    super();
    this.state={
      animationVal: new Animated.Value(0),
      left: (Math.random() * (width - CIRC_SIZE)),
      top: (Math.random() * (height - (CIRC_SIZE*3))),
      color: this.getColor(),
      sound: realm.objects('Sound')[0].sound,
      restart: false,
    }
  }

  animateCircle(callback){
    Animated.sequence([
        Animated.timing(this.state.animationVal, {duration: 400, delay: 500, toValue: 1 }),
        Animated.timing(this.state.animationVal, {duration: 400, delay: 1000, toValue: 0 }),
    ]).start(callback);
  }

  renderNewCircle(){
    count++;
    this.setState({
      left: (Math.random() * (width - CIRC_SIZE)),
      top: (Math.random() * (height - CIRC_SIZE)),
      color: this.getColor(),
    })

  }

  getColor(){
    return colorDatabase[count%colorDatabase.length];
  }


  componentDidMount(){
    count = 0;
    this.animateCircle(this.renderNewCircle.bind(this));
  }

  componentDidUpdate(){
    if(!this.state.restart){
      this.animateCircle(this.renderNewCircle.bind(this));
    }
  }

  replaceLowestScore(){
    realm.write(()=>{
       realm.objects('HighScores')[0].score = this.props.score;
    });
  }

  restartGame(){
    if(this.props.score > realm.objects('HighScores')[0].score){
      this.replaceLowestScore();
    }
    this.props.replaceRoute({
      component: GameMenu,
      hideNavigationBar: true,
      noStatusBar: true,
      sceneConfig: Navigator.SceneConfigs.FadeAndroid,
      trans: true,
      data: this.props.noise
    });
  }

  render(){

    if(this.props.score > realm.objects('HighScores')[0].score){

      return(

          <TouchableHighlight underlayColor='#E0E0E0' style={styles.container} onPress={this.restartGame.bind(this)}>
          <View style={styles.container}>
          <Icon name='md-trophy' size={160} color='#dab622' style={{elevation: 2}}/>
          <Text style={[styles.score,{color: colorDatabase[this.props.score % colorDatabase.length]}]}>{this.props.score}</Text>
          <Text style={styles.bestScore}>NEW RECORD</Text>

          <Text style={styles.reset}>TAP TO RESTART</Text>
          <Animated.View  style={[styles.circle, {left: this.state.left, top: this.state.top, backgroundColor: this.state.color}, {opacity: this.state.animationVal}]} />
          </View>

          </TouchableHighlight>

      );
    }else{
    return(
      <TouchableHighlight underlayColor='#E0E0E0' style={styles.container} onPress={this.restartGame.bind(this)}>
      <View style={styles.container}>
      <Text style={[styles.score, {color: colorDatabase[this.props.score % colorDatabase.length]}]}>{this.props.score}</Text>
      <Text style={styles.bestScore}>BEST {realm.objects('HighScores')[0].score}</Text>

        <Text style={styles.reset}>TAP TO RESTART</Text>
        <Animated.View  style={[styles.circle, {left: this.state.left, top: this.state.top, backgroundColor: this.state.color}, {opacity: this.state.animationVal}]} />
      </View>


      </TouchableHighlight>
    );
  }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    alignSelf:'stretch',
  },
  score:{
    fontSize: 60,
    elevation: 2,

  },
  bestScore:{
    fontSize: 30,
    elevation: 2,
  },
  reset:{
    marginTop: 40,
    fontSize: 20,
    elevation: 2,
  },
  circle:{
    position: 'absolute',
    width: CIRC_SIZE,
    height: CIRC_SIZE,
    borderRadius: CIRC_SIZE,
  },
})


export default GameOver;
