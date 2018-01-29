import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
} from 'react-native';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';


@observer
export default class WebComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  //Fix conflict with postMessage used fro the iFrame
  patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
  })})();`

  componentWillMount() {
    this.reactToMessage = reaction(
      () => this.props.store._messageFromNative,
      message => this._forwardMessageToWebView(message)
    );
  }

  componentWillUnmount() {
    this.reactToMessage();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>WEBVIEW COMPONENT</Text>
        <WebView
          ref={ref => { this.webview = ref }}
          onMessage={this._handleMessage.bind(this)}
          injectedJavaScript = {this.patchPostMessageJsCode}
          source={require('./webview.html')}
          javaScriptEnabled={true}
        />
      </View>
    );
  }

  _handleMessage(e) {
    this.props.store.sendMessageToNative(e.nativeEvent.data);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});