import React from 'react';
import {
  Animated,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Provider, connect } from 'react-redux';
import { store } from './sections/Redux';
import {
  SafeAreaView,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import * as Sections from './sections';
import { useScreens } from 'react-native-screens';
import { Assets as StackAssets } from 'react-navigation-stack';
import { Constants, Asset } from 'expo';
import stall from './sections/stall';

// vvvvvvv codecast url
// https://www.codecast.io/play_cast/7rGRpEMgpxy4
// ^^^^^^^ codecast url

useScreens();
Asset.loadAsync(StackAssets);

class Button extends React.Component {
  render() {
    return (
      <RectButton
        style={{
          backgroundColor: '#eee',
          borderRadius: 5,
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          paddingVertical: 10,
          marginHorizontal: 20,
        }}
        onPress={this.props.onPress}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}>
          {this.props.title}
        </Text>
      </RectButton>
    );
  }
}

@connect(store => ({ user: store.user }))
class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    options: {
      emojiSize: {
        size: 100,
      },
    },
  };

  scrollY = new Animated.Value(0);
  handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
    { useNativeDriver: true }
  );

  render() {
    let scale = this.scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.3, 1],
      extrapolateRight: 'clamp',
    });

    let translateX = this.scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [50, 0],
      extrapolateRight: 'clamp',
    });

    let translateY = this.scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [-10, 0],
      extrapolateRight: 'clamp',
    });

    let opacity = this.scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0],
    });

    let underlayOpacity = this.scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
    });

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={() => stall()}>
            <Animated.Text
              style={{
                opacity,
                transform: [{ translateX }, { translateY }, { scale }],
                marginLeft: 20,
                marginBottom: 20,
                fontWeight: '600',
                fontSize: 35,
                textAlign: 'left',
              }}>
              "Performance"
            </Animated.Text>
          </TouchableOpacity>

          <Button
            title="Deferring expensive rendering"
            onPress={() => this.props.navigation.navigate('Map')}
          />

          <Button
            title="Lists"
            onPress={() => this.props.navigation.navigate('Lists')}
          />

          <Button
            title="Redux"
            onPress={() => this.props.navigation.navigate('Redux')}
          />

          <Button
            title="Animation with useNativeDriver"
            onPress={() => this.props.navigation.navigate('Animation')}
          />

          {/* {[...Array(20).keys()].map(k => (
            <Button
              key={k.toString()}
              title={`Placeholder ${k}`}
              onPress={() => this.props.navigation.navigate('Animation')}
            />
          ))} */}

          {this.props.user ? (
            <Text
              style={{
                marginTop: 15,
                color: '#888',
                textAlign: 'center',
                marginHorizontal: 20,
              }}>
              Signed in as {this.props.user.name}
            </Text>
          ) : null}
          <StatusBar hidden={false} barStyle="default" />
        </Animated.ScrollView>

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 25,
            backgroundColor: 'rgba(255,255,255,0.9)',
            opacity: underlayOpacity,
          }}
        />
        <BorderlessButton
          onPress={this._toggleEmojiSize}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 150,
            height: 150,
          }}>
          <Emoji emojiSize={this.state.options.emojiSize} />
        </BorderlessButton>
      </SafeAreaView>
    );
  }

  _toggleEmojiSize = () => {
    let options = {
      ...this.state.options,
      emojiSize: { ...this.state.options.emojiSize },
    };

    if (options.emojiSize.size === 100) {
      options.emojiSize.size = 50;
    } else {
      options.emojiSize.size = 100;
    }
    this.setState({ options });
  };
}

class Emoji extends React.PureComponent {
  render() {
    // stall(1000);

    return (
      <Text
        style={{
          fontSize: this.props.emojiSize.size,
          position: 'absolute',
          bottom: 15,
          left: 15,
        }}>
        🙃
      </Text>
    );
  }
}

let Stack = createStackNavigator({
  Home,
  ...Sections,
});

let AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
    paddingBottom: 30,
  },
});
