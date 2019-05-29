import React from 'react';
import {
  Animated,
  Dimensions,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import stall from './stall';

let BLUE = '#002B7F';
let WHITE = '#FFF';
let RED = '#CE1126';
let USE_NATIVE_DRIVER = true;

export default class App extends React.Component {
  progress = new Animated.Value(0);
  state = {
    value: 0,
  };

  render() {
    let rotate = this.progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    let translateX = this.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Dimensions.get('window').width - 110],
    });

    // let backgroundColor = this.progress.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [BLUE, WHITE, RED],
    // });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            { /* backgroundColor, */ transform: [{ translateX }, { rotate }] },
            styles.box,
          ]}
        />
        <Button title="Play" onPress={this._playAnimation} />
        <Button title="Reverse" onPress={this._reverseAnimation} />
        <Button title="Pause" onPress={this._pauseAnimation} />
        <Button title="Reset" onPress={this._resetAnimation} />
        <Button title="Stall JS thread" onPress={() => stall(200)} />
      </View>
    );
  }

  _playAnimation = () => {
    Animated.timing(this.progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  };

  _reverseAnimation = () => {
    Animated.timing(this.progress, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  };

  _pauseAnimation = () => {
    this.progress.stopAnimation();
  };

  _resetAnimation = () => {
    this.progress.setValue(0);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  box: {
    backgroundColor: 'red',
    marginHorizontal: 20,
    width: 70,
    height: 70,
    marginBottom: 80,
    borderWidth: 1,
    borderColor: '#000',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
