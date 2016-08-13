import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated,
  Navigator,
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import GameScreen from './GameScreen.js';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
let colorDatabase  = ['#e24e42','#328cc1','#eb6e80','#94618e','#f2d388','#93c178','#f19f4d','#88d317','#d48cf8','#155765', '#1fb58f','#99ced4','#cda34f'];
const CIRC_SIZE = height/8;

class GameMenu extends Component {

  constructor(){
    super();
    this.state = {
      animationVal: new Animated.Value(0),
      left: 80,
      top: 100,
      color: this.getColor(),

    }

  }

  animateCircle(callback){
    Animated.sequence([
        Animated.timing(this.state.animationVal, {duration: 400, delay: 500, toValue: 1 }),
        Animated.timing(this.state.animationVal, {duration: 400, delay: 1000, toValue: 0 }),
    ]).start(callback);
  }

  renderNewCircle(){
    this.setState({
      left: (Math.random() * (width - CIRC_SIZE)),
      top: (Math.random() * (height - CIRC_SIZE)),
      color: this.getColor(),
    })
    this.animateCircle(this.renderNewCircle.bind(this));
  }

  getColor(){
    return colorDatabase[Math.floor(Math.random() * colorDatabase.length)];
  }


  componentDidMount(){
    this.animateCircle(this.renderNewCircle.bind(this));
  }

  playGame(){

      this.props.toRoute({
        component: GameScreen,
        hideNavigationBar: true,
        noStatusBar: true,
        trans: true,
        sceneConfig: Navigator.SceneConfigs.FadeAndroid,
      });


  }

  blankFunc(){

  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.homeWrapper}>

      <Text style={styles.titleText}>Circle</Text>
        <View style={styles.menuItemsWrapper}>
          <TouchableHighlight style={styles.menuItem} underlayColor='transparent' onPress={this.blankFunc} activeOpacity={0.7}>
            <Octicon name="graph" size={45} color='#7c7979' />
          </TouchableHighlight>

          <TouchableHighlight style={styles.play} underlayColor='transparent' onPress={this.playGame.bind(this)} activeOpacity={0.7}>
          <Icon name="play-arrow" size={120} color='#7c7979'/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.menuItem} underlayColor='transparent' onPress={this.blankFunc} activeOpacity={0.7} >
            <Octicon name="gear" size={45} color='#7c7979'/>
          </TouchableHighlight>
        </View>
        <Text style={styles.titleText}>Smasher</Text>


        </View>
        <Animated.View  style={[styles.circle, {left: this.state.left, top: this.state.top, backgroundColor: this.state.color}, {opacity: this.state.animationVal}]} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#E0E0E0',
  },

  circle:{
    position: 'absolute',
    width: CIRC_SIZE,
    height: CIRC_SIZE,
    borderRadius: CIRC_SIZE,
  },

  title:{
    fontSize:35,
    marginBottom:40,
  },

homeWrapper:{
    elevation: 2,
    justifyContent:'space-around',

},

  titleText:{
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#6f6d6d',
    opacity: 1,

  },

  menuItemsWrapper:{

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 30,
    marginTop: 30,

  },

  menuItem:{



  },

  menuItemText:{
    fontSize: 20,
    //color: '#9575CD'

  },

  play:{
    borderColor: '#7c7979',
    borderRadius: width / 2,
    borderWidth: 5,
    backgroundColor: '#E0E0E0',
    elevation: 4,

  }
//#F5FCFF

});

export default GameMenu;
