import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { MapView } from 'expo';

function isReadyAfterDidFocus(Component) {
  class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);

      let listener = props.navigation.addListener('didFocus', () => {
        this.setState({ isReady: true });
        // Don't need to listen anymore once it's been focused once
        listener.remove();
      });
      this.state = {
        isReady: false,
      };
    }

    render() {
      return <Component {...this.props} isReady={this.state.isReady} />;
    }
  }

  return withNavigation(WrappedComponent);
}

class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.isReady ? (
          <MapView style={{ flex: 1 }} /* provider="google" */ />
        ) : (
          <View style={{ flex: 1, backgroundColor: '#f2ecd8' }} />
        )}
      </View>
    );
  }
}

// export default Map;
export default isReadyAfterDidFocus(Map);

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
