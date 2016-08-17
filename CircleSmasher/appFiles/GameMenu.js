import React, { Component } from 'react';
import {
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
import realm from './realm.js';
import Sound from 'react-native-sound';
import SoundComp from './SoundComp';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
//let colorDatabase  = ['#e24e42','#328cc1','#eb6e80','#94618e','#f2d388','#93c178','#f19f4d','#88d317','#d48cf8','#155765', '#1fb58f','#99ced4','#cda34f'];
let colorDatabase = ['#BCCF02'/*lime*/,'#9B539C'/*purple*/,'#DE8642'/*orange*/,'#73C5E1'/*bright blue*/,
                     '#5BB12F'/*green*/,'#EE4B3E'/*red*/,'#E9BC1B'/*dull yellow*/,'#EB65A0'/*pink*/,
                    ];
const CIRC_SIZE = height/8;
var count = 0;
class GameMenu extends Component {

  constructor(){
    super();
    this.state = {
      animationVal: new Animated.Value(0),
      left: (Math.random() * (width - CIRC_SIZE)),
      top: (Math.random() * (height - (CIRC_SIZE*3))),
      color: this.getColor(),

      play: false,
    }

  }

  animateCircle(callback){

    Animated.sequence([
        Animated.timing(this.state.animationVal, {duration: 400, delay: 500, toValue: 1 }),
        Animated.timing(this.state.animationVal, {duration: 400, delay: 1000, toValue: 0 }),
    ]).start(callback);

  }

  renderNewCircle(){

    if(realm.objects('Sound')[0].sound === true && count === 0){
      this.props.data.setVolume(0.5).setNumberOfLoops(-1).play();
    }

    count++;
    this.setState({
      left: (Math.random() * (width - CIRC_SIZE)),
      top: (Math.random() * (height - CIRC_SIZE)),
      color: this.getColor(),
    });

  }

  getColor(){
    return colorDatabase[count%colorDatabase.length];
  }


  componentDidMount(){
    count = 0;
    this.animateCircle(this.renderNewCircle.bind(this));
  }

  componentDidUpdate(){
    if(!this.state.play){
      this.animateCircle(this.renderNewCircle.bind(this));
    }
  }

  stopCircles(){
    this.setState({
      play: true,
    });

    this.playGame();
  }


  playGame(){
      this.props.replaceRoute({
        component: GameScreen,
        hideNavigationBar: true,
        noStatusBar: true,
        trans: true,
        sceneConfig: Navigator.SceneConfigs.FadeAndroid,
        data: this.props.data,
      });
  }

  blankFunc(){

  }



  render() {

    return (
      <View style={styles.container}>
      <View style={styles.homeWrapper}>

      <Text style={styles.titleText}>CIRCLE</Text>
        <View style={styles.menuItemsWrapper}>
          <TouchableHighlight style={styles.menuItem} underlayColor='transparent' onPress={this.blankFunc} activeOpacity={0.7}>
            <Octicon name="gear" size={45} color='#7c7979'/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.play} underlayColor='transparent' onPress={this.stopCircles.bind(this)} activeOpacity={0.7}>
          <Icon name="play-arrow" size={120} color='#7c7979'/>
          </TouchableHighlight>

          <SoundComp data={this.props.data}/>

        </View>
        <Text style={styles.titleText}>SMASHER</Text>


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
