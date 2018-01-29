import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native';

import { observer } from 'mobx-react';

@observer
export default class NativeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
    }
  }

  render() {
    let { store } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>NATIVE COMPONENT</Text>
        <View style={styles.textInputContainer}>
        </View>
        <Text>{this.state.text || `${store.messageFromWebView}`}</Text>
      </View>
    );
  }


  _handlePress() {
    let { store } = this.props;
    store.sendMessageToWebView(this.state.text);
    this.setState({ text: "" });

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
  textInputContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 4,
  },
});