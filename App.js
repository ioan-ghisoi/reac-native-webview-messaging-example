import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'mobx-react/native';

import NativeComponent from './app/nativeComponent';
import WebComponent from './app/webComponent';
import Store from './app/store';
const store = new Store();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <WebComponent store={store} />
        <NativeComponent store={store} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});

AppRegistry.registerComponent('WebViewMessaging', () => WebViewMessaging);
