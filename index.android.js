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
  TouchableOpacity,
  Modal
} from 'react-native';
import { Button } from 'react-native-material-design';
import _ from 'lodash';

class ssp extends Component {
  constructor(props) {
    super(props);

    this.state = ssp.initialState;
  }

  static initialState = {
   winCount: 0,
   straightWinCount: 0,
   highestStraightWinCount: 0,
   isPreviousWin: false,
   myChoice: null,
   yourChoice: null,
   setResult: null,
   setNumber: 0,
   myImageUri: require('./images/default.png'),
   yourImageUri: require('./images/default.png'),
   myResultText: '',
   myResultImage: require('./images/default.png'),
   yourResultText: '',
   yourResultImage: require('./images/default.png'),
   isFirstSet: true,
   showModal: false,
   myResultTextStyle: {},
   yourResultTextStyle: {}
 };

  static options = [
    { name: 'scissor', image: require('./images/scissor.jpg') },
    { name: 'stone', image: require('./images/stone.jpg') },
    { name: 'paper', image: require('./images/paper.jpg') }
  ];

  static resultImages = {
    'win': require('./images/win.png'),
    'draw': require('./images/draw.png'),
    'lose': require('./images/lose.png')
  };

  _setModalVisible = (visible) => {
    this.setState({showModal: visible});
  };

  _resetGame = () => {
    this.setState({
      ...ssp.initialState
    });
  }

  _closeModal = () => {
    // Reset game
    this._resetGame();
    this._setModalVisible(false);
  };

  /*
  * 0: scissor, 1: stone, 2: paper
  *
  */
  judge = (myChoice) => (event) => {
    const yourChoice = _.sample([0,1,2]);
    const setResult = this.getResult(myChoice, yourChoice);
    const winCount = (this.state.winCount + setResult) > 0 ? (this.state.winCount + setResult) : 0; // winCount can NOT be less than 0
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
    let myResultTextStyle;
    let yourResultTextStyle;
    switch (setResult) {
      case 1:
        myResultText = 'win';
        myResultTextStyle = styles.winText;
        yourResultText = 'lose';
        yourResultTextStyle = styles.loseText;
        break;
      case -1:
        myResultText = 'lose';
        myResultTextStyle = styles.loseText;
        yourResultText = 'win';
        yourResultTextStyle = styles.winText;
        break;
      default:
        myResultText = 'draw';
        myResultTextStyle = styles.drawText;
        yourResultText = 'draw';
        yourResultTextStyle = styles.drawText;

    }
    this.setState({
      yourChoice,
      myChoice,
      setResult,
      isPreviousWin: setResult === 1,
      straightWinCount,
      highestStraightWinCount,
      myImageUri: ssp.options[myChoice].image,
      myResultImage: ssp.resultImages[myResultText],
      yourImageUri: ssp.options[yourChoice].image,
      yourResultImage: ssp.resultImages[yourResultText],
      myResultText,
      yourResultText,
      winCount,
      isFirstSet: false,
      showModal: this.state.winCount + setResult === 5,
      myResultTextStyle,
      yourResultTextStyle
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
    const {setResult, myImageUri, yourImageUri, yourResultImage, myResultImage, myResultText, yourResultText, straightWinCount, winCount, showModal, myResultTextStyle, yourResultTextStyle} = this.state;
    // console.log(`------------------------${straightWinCount}`);
    // console.log(`------------${winCount}`);

    return (
      <View style={styles.container}>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          { [0,1,2,3,4].map((value) => {
            const starStyle = value < winCount ? {width: 20, height: 20, backgroundColor: 'yellow'} : {width: 20, height: 20};
            // console.log(starStyle);
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
            <Text style={styles.nameText}>爸爸</Text>
            { setResult !== null &&
              <Image
                style={{width: 60, height: 60}}
                source={yourResultImage}
              />
            }
          </View>
          <Image
            style={{width: 60, height: 60}}
            source={yourImageUri}
          />
        </View>

        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/lizi_profile.png')}
          />
          <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={styles.nameText}>李子</Text>
            { setResult !== null &&
              <Image
                style={{width: 60, height: 60}}
                source={myResultImage}
              />
            }
          </View>
          <Image
            style={{width: 80, height: 80}}
            source={myImageUri}
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

        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'skyblue', justifyContent: 'space-around'}}>
          <Button onPress={this._resetGame} text='重新开始'></Button>
          <Button onPress={this._resetGame} text='结束'></Button>
        </View>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={()=> console.log('closed')}
          >
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 200, height: 200}}
              source={require('./images/smiley_sun_glasses.jpg')}
            />
            <Text>恭喜李子小朋友过关!!!</Text>
            <Button onPress={this._closeModal} text={'知道啦!'} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#979797',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  winText: {
    fontSize: 20,
    color: 'green',
  },
  loseText: {
    fontSize: 20,
    color: 'red',
  },
  drawText: {
    fontSize: 20,
    color: 'yellow',
  },
});

AppRegistry.registerComponent('ssp', () => ssp);
