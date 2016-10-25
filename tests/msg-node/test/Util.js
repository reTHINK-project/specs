export default class Util {

  constructor(mnType) {
    this.mnType = mnType;
  }

  expectConnected(m, runtimeStubURL) {
    expect(m.type).to.eql("update");
    expect(m.from).to.eql(runtimeStubURL);
    expect(m.to).to.eql(runtimeStubURL + "/status");
    expect(m.body.value).to.eql("connected");
  }

  expectDisconnected(m, runtimeStubURL) {
    expect(m.type).to.eql("update");
    expect(m.from).to.eql(runtimeStubURL);
    expect(m.to).to.eql(runtimeStubURL + "/status");
    expect(m.body.value).to.eql("disconnected");
  }

  log(msg, value) {
    console.info(this.mnType + " - " + msg + ': ' + value);
  }

}
