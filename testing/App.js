import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function incrementCount(state) {
  return {
    ...state,
    count: state.count + 1,
  };
}

export default class App extends React.Component {
  state = {
    count: 0,
  };

  _increase = () => {
    this.setState(incrementCount, () => {
      if (this.props.onCountIncreased) {
        this.props.onCountIncreased(this.state.count);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Increase" onPress={this._increase} />
        <Text testID="counter">{this.state.count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
