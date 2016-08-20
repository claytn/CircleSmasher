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
import Unlockables from './Unlockables.js';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
let titleColors = [['#28abe3','#1fda9a'],['#00a03e','#ffa200'],['#f0c654','#de5842'],['#94fffc','#fac8bf'],['#f38f00','#71569b'],['#d75c37','#6a8d9d']];
let colorDatabase = ['#BCCF02'/*lime*/,'#9B539C'/*purple*/,'#DE8642'/*orange*/,'#73C5E1'/*bright blue*/,
                     '#C0B283' /*pale gold*/,'#5BB12F'/*green*/,'#EE4B3E'/*red*/,'#E9BC1B'/*dull yellow*/,'#EB65A0'/*pink*/,
                     '#FC4A1A'/*vermilion*/, '#4ABDAC'/*fresh blue*/,  '#373737'/*charcoal*/,
                     '#EEAA7B'/*pale orange*/,'#A239CA'/*fuscia*/, '#4717F6'/*jewel blue*/, '#6D7993'/*lavender*/,
                     '#3CC47C'/*electric green*/, '#B82601'/*ember red*/,'#812772'/*posy pink*/,'#062F4F'/*ink blue*/,
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
      titleColor: titleColors[Math.floor(Math.random()*titleColors.length)],
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
      titleColor: titleColors[Math.floor(Math.random()*titleColors.length)]
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

  changeTheme(){
    this.props.data.stop();
    realm.write(()=>{
      realm.objects('Sound')[0].sound = false;
    });
    this.props.replaceRoute({
      component: Unlockables,
      hideNavigationBar: true,
      noStatusBar: true,
      trans: true,
      sceneConfig: Navigator.SceneConfigs.FadeAndroid,
    });
  }



  render() {

    return (
      <View style={styles.container}>
      <View style={styles.homeWrapper}>

      <Text style={[styles.titleText,{color:this.state.titleColor[0]}]}>CIRCLE</Text>
        <View style={styles.menuItemsWrapper}>
          <TouchableHighlight style={styles.menuItem} underlayColor='transparent' onPress={this.changeTheme.bind(this)} activeOpacity={0.7}>
            <Icon name="developer-board" size={45} color='#7c7979'/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.play} underlayColor='transparent' onPress={this.stopCircles.bind(this)} activeOpacity={0.7}>
          <Icon name="play-arrow" size={120} color='#7c7979'/>
          </TouchableHighlight>

          <SoundComp data={this.props.data}/>

        </View>
        <Text style={[styles.titleText,{color: this.state.titleColor[1]}]}>SMASHER</Text>


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
