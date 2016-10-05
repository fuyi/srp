/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-material-design';
import _ from 'lodash';

class ssp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winCount: 0,
      straightWinCount: 0,
      highestStraightWinCount: 0,
      isPreviousWin: false,
      myChoice: null,
      yourChoice: null,
      setResult: null,
      setNumber: 0,
      myImageUri: '',
      yourImageUri: '',
      myResultText: '',
      yourResultText: '',
      isFirstSet: true
    };
  }


  static options = [
    { name: 'scissor', image: require('./images/scissor.jpg') },
    { name: 'stone', image: require('./images/stone.jpg') },
    { name: 'paper', image: require('./images/paper.jpg') }
  ];

  /*
  * 0: scissor, 1: stone, 2: paper
  *
  */
  judge = (myChoice) => (event) => {
    const yourChoice = _.sample([0,1,2]);
    const setResult = this.getResult(myChoice, yourChoice);
    // Check straight win
    let straightWinCount = 0;
    if ((this.state.isPreviousWin || this.state.isFirstSet) && (setResult === 1)) {
      if (this.state.straightWinCount === 0) {
        straightWinCount = 2;
      } else {
        straightWinCount = this.state.straightWinCount + 1;
      }
    }
    const highestStraightWinCount = straightWinCount > this.state.highestStraightWinCount ? straightWinCount : this.state.highestStraightWinCount;

    let myResultText = '';
    let yourResultText = '';
    switch (setResult) {
      case 1:
        myResultText = 'win';
        yourResultText = 'lose';
        break;
      case -1:
        myResultText = 'lose';
        yourResultText = 'win';
        break;
      default:
        myResultText = 'draw';
        yourResultText = 'draw';

    }
    this.setState({
      yourChoice,
      myChoice,
      setResult,
      isPreviousWin: setResult === 1,
      straightWinCount,
      highestStraightWinCount,
      myImageUri: ssp.options[myChoice].image,
      yourImageUri: ssp.options[yourChoice].image,
      myResultText,
      yourResultText,
      winCount: this.state.winCount + setResult,
      isFirstSet: false
    });
  }

  /*
  * 0: draw, 1: win, -1: lose
  *
  */
  getResult = (myChoice, yourChoice) => {
    if (myChoice === yourChoice) {
      return 0;
    }
    if ((myChoice === 0 && yourChoice == 2) || (myChoice === 1 && yourChoice == 0) || (myChoice === 2 && yourChoice == 1)) {
      return 1;
    }

    return -1;
  }

  render() {
    const {myImageUri, yourImageUri, myResultText, yourResultText, straightWinCount, winCount} = this.state;
    console.log(`------------------------${straightWinCount}`);
    console.log(`------------${winCount}`);
    return (
      <View style={styles.container}>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          { [0,1,2,3,4].map((value) => {
            const starStyle = value < winCount ? {width: 20, height: 20, backgroundColor: 'yellow'} : {width: 20, height: 20};
            console.log(starStyle);
            return (
              <Image
                key={value}
                style={starStyle}
                source={require('./images/ic_grade.png')}
              />
            );
          }) }
        </View>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/papa_profile.png')}
          />
          <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>爸爸</Text>
            <Text>{yourResultText}</Text>
          </View>
          <Image
            style={{width: 80, height: 80}}
            source={yourImageUri}
          />
        </View>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          { ssp.options.map((option, index) => {
            return (
              <TouchableOpacity onPress={this.judge(index)} key={index}>
                <Image
                  style={{width: 80, height: 80}}
                  source={option.image}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/lizi_profile.png')}
          />
          <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>李子</Text>
            <Text>{myResultText}</Text>
          </View>
          <Image
            style={{width: 80, height: 80}}
            source={myImageUri}
          />
        </View>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'skyblue', justifyContent: 'space-around'}}>
          <Button text='重新开始'></Button>
          <Button text='结束'></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979797',
  }
});

AppRegistry.registerComponent('ssp', () => ssp);
