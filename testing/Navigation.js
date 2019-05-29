import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const Home = ({ navigation }) => (
  <View>
    <Text testID="title">Home page</Text>
    <Button title="Go to About" onPress={() => navigation.navigate('About')} />
  </View>
);

const About = ({ navigation }) => (
  <View>
    <Text testID="title">About page</Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  </View>
);

const AppNavigator = createStackNavigator(
  { Home, About },
  { initialRouteName: 'Home' }
);

export default createAppContainer(AppNavigator);
