import { observable, computed, action } from 'mobx';

export default class {

  @observable _messageFromNative = ""
  @observable _messageFromWebView = ""

  @computed get messageFromNative() {
    return this._messageFromNative;
  }

  @computed get messageFromWebView() {
    return this._messageFromWebView;
  }

  @action sendMessageToWebView(message) {
    this._messageFromNative = message;
  }

  @action sendMessageToNative(message) {
    this._messageFromWebView = message;
  }
}