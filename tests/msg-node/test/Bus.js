export default class Bus {
  constructor(onStubMessage, doLog) {
    this.onStubMessage = onStubMessage;
    this.doLog = false || doLog;
    this.send = null;
    this.num = 0;
  }

  postMessage(msg) {
    this.num ++;
    if (this.doLog)
      console.log(this.num + ": " + JSON.stringify(msg));
    this.onStubMessage(msg, this.num);
  }

  addListener(url, sendCallback) {
    this.send = sendCallback;
  }

  sendStubMsg(msg) {
    this.send(msg);
  }

  setStubMsgHandler(newHandler, doLog) {
    this.onStubMessage = newHandler;
    this.doLog = doLog;
  }
}
