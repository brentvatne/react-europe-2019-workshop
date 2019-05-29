import React from 'react';
import { Constants, Updates } from 'expo';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

import Sentry from 'sentry-expo';
// import { SentrySeverity, SentryLog } from 'react-native-sentry';
Sentry.config(
  'https://341188480a36496a8a983eccdecaa895@sentry.io/1460585'
).install();

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <SafeAreaView
            style={{
              paddingHorizontal: 15,
              paddingBottom: 100,
            }}>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
              Manifest for version:{' '}
              <MonoText style={{ fontSize: 16 }}>
                {Constants.manifest.version}
              </MonoText>
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: '#ccc',
                marginTop: 10,
                marginBottom: 20,
              }}
            />
            <MonoText>{JSON.stringify(Constants.manifest, null, 2)}</MonoText>
          </SafeAreaView>
        </ScrollView>

        <ReloadButton onPress={this.handlePressUpdateAsync} />
      </View>
    );
  }

  handlePressUpdateAsync = async () => {
    try {
      // Fake an error!
      throw new Error('Fake error when trying to get update!');
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        alert('Update available! Downloading...');
        await Updates.fetchUpdateAsync();
        if (await shouldReloadAsync()) {
          Updates.reloadFromCache();
        }
      } else {
        alert('No update available');
      }
    } catch (e) {
      // Catch but don't crash!
      Sentry.captureException(e);
      alert(e.message);
    }
  };
}

const MonoText = props => (
  <Text
    {...props}
    style={[
      props.style,
      { fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }) },
    ]}
  />
);

function shouldReloadAsync() {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Update ready',
      'Do you want to restart and open it now?',
      [
        { text: 'Yes please', onPress: () => resolve(true) },
        {
          text: 'Nope',
          onPress: () => reject(false),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  });
}

class ReloadButton extends React.Component {
  render() {
    return (
      <RectButton
        style={{
          position: 'absolute',
          bottom: 0,
          height: 90,
          backgroundColor: 'rgba(0,0,0,0.9)',
          right: 0,
          left: 0,
        }}>
        <RectButton
          underlayColor="rgba(255,255,255,0.7)"
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={this.props.onPress}>
          <SafeAreaView>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#fff' }}>
              Check for app update
            </Text>
          </SafeAreaView>
        </RectButton>
      </RectButton>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
