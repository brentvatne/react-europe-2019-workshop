import React from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import HeaderButtons, {
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

const count = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
};

let rootReducer = combineReducers({ user, count });
let store = createStore(rootReducer);

@connect(store => ({ user: store.user }))
class LogInButton extends React.Component {
  _signIn = () => {
    this.props.dispatch({ type: 'SET_USER', user: { id: 123, name: 'Brent' } });
  };

  _signOut = () => {
    this.props.dispatch({ type: 'SET_USER', user: null });
  };

  render() {
    let button;
    if (this.props.user) {
      button = <Item title="Sign out" onPress={this._signOut} />;
    } else {
      button = <Item title="Sign in" onPress={this._signIn} />;
    }

    return <HeaderButtons>{button}</HeaderButtons>;
  }
}

@connect(store => ({ count: store.count }))
class Counter extends React.Component {
  static navigationOptions = {
    title: 'Counter',
    headerRight: <LogInButton />,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            marginBottom: 20,
            marginTop: 20,
          }}>
          {this.props.count}
        </Text>
        <Button title="Increment" onPress={this._increment} />
        <Button title="Decrement" onPress={this._decrement} />
      </View>
    );
  }

  _increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  };

  _decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  };
}

export { store, Counter as default };
