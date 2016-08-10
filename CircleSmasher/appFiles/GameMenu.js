import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated,
} from 'react-native';
import Dimensions from 'Dimensions';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
let colorDatabase  = ['#33ff33','#ff66cc','#3399ff','#ffff00'];
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
        Animated.timing(this.state.animationVal, {duration: 400, delay: 500, toValue: 0.7 }),
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

  render() {
    return (
      <View style={styles.container}>

      <View style={styles.menu}>

        <Text style={styles.title}>
          Circle Smasher
        </Text>

        <TouchableHighlight style={styles.menuItem}>
          <Text style={styles.menuItemText}>Play</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuItem}>
          <Text style={styles.menuItemText}>Rankings</Text>
        </TouchableHighlight>

        </View>
          <Animated.View style={[styles.circle, {left: this.state.left, top: this.state.top, backgroundColor: this.state.color}, {opacity: this.state.animationVal}]} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

  circle:{
    position: 'absolute',
    width: CIRC_SIZE,
    height: CIRC_SIZE,
    borderRadius: CIRC_SIZE,
    zIndex: -1,
  },

  title:{
    fontSize:35,
    marginBottom:40,
  },

  menu:{
    alignItems: 'center',
    zIndex: 1,
  },

  menuItem:{
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
    alignSelf: 'stretch',
    marginRight:20,
    marginLeft: 20,

  },
  menuItemText:{
    fontSize: 20,
    textAlign: 'center'
  }
});

export default GameMenu;
