import expect from 'expect.js';
import StubLoader  from './StubLoader.js';
import Bus         from './Bus.js';
import Util        from './Util.js';

describe('connect / disconnect spec', function() {

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
          stub.disconnect();
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
    stub.connect();
  });

});
