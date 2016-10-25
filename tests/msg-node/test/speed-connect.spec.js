import expect from 'expect.js';
import StubLoader  from './StubLoader.js';
import Bus         from './Bus.js';
import Util        from './Util.js';

describe('speedconnect spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  let runtimeURL     = "runtime://" + stubConfig.domain + "/1";
  let runtimeStubURL = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';

  it('connect/disconnect', function(done) {
    let stub;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);
          // stub.disconnect();
          break;

        case 2:
          util.expectDisconnected(m, runtimeStubURL);
          done();
        break;
        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    // stub.connect();
    bus.sendStubMsg("TEST-Message 1");
    bus.sendStubMsg("TEST-Message 2");
    bus.sendStubMsg("TEST-Message 3");
    bus.sendStubMsg("TEST-Message 4");
    bus.sendStubMsg("TEST-Message 5");
    bus.sendStubMsg("TEST-Message 6");
    bus.sendStubMsg("TEST-Message 7");
    bus.sendStubMsg("TEST-Message 8");
    bus.sendStubMsg("TEST-Message 9");
    bus.sendStubMsg("TEST-Message 10");
    bus.sendStubMsg("TEST-Message 11");
  });

});
