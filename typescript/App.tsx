import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  NavigationState,
  NavigationScreenProp,
} from 'react-navigation';
import { Haptic } from 'expo';

type HomeScreenProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

class Home extends React.Component<HomeScreenProps> {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Home screen 😘</Text>
        <Button
          title="Beep boop"
          onPress={() => {
            // problem with type definition, patch-package!
            Haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
          }}
        />
        <Button
          title="Go to other"
          onPress={() =>
            this.props.navigation.navigate('Other', { message: '🤩' })
          }
        />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

type OtherParams = {
  message: string;
};

type OtherScreenProps = {
  navigation: NavigationScreenProp<NavigationState, OtherParams>;
};

class Other extends React.Component<OtherScreenProps> {
  static navigationOptions = {
    title: 'Other',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 100 }}>
          {this.props.navigation.getParam('message')}
        </Text>
      </View>
    );
  }
}

let Stack = createStackNavigator(
  {
    Home,
    Other,
  },
  {
    defaultNavigationOptions: {
      title: 'Hello',
    },
  }
);

export default createAppContainer(Stack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
