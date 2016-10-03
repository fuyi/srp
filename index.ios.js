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
  View
} from 'react-native';
import { Button } from 'react-native-material-design';

class ssp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 20, height: 20, backgroundColor: 'yellow'}}
            source={require('./images/ic_grade.png')}
          />
          <Image
            style={{width: 20, height: 20, backgroundColor: 'yellow'}}
            source={require('./images/ic_grade.png')}
          />
          <Image
            style={{width: 20, height: 20}}
            source={require('./images/ic_grade.png')}
          />
          <Image
            style={{width: 20, height: 20}}
            source={require('./images/ic_grade.png')}
          />
          <Image
            style={{width: 20, height: 20}}
            source={require('./images/ic_grade.png')}
          />
        </View>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/papa_profile.png')}
          />
        <Text>爸爸</Text>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/stone.jpg')}
          />
        </View>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/scissor.jpg')}
          />
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/stone.jpg')}
          />
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/paper.jpg')}
          />
        </View>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/lizi_profile.png')}
          />
          <Text>
            李子
          </Text>
          <Image
            style={{width: 80, height: 80}}
            source={require('./images/stone.jpg')}
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
