import expect from 'expect.js';
import StubLoader  from './StubLoader.js';
import Bus         from './Bus.js';
import Util        from './Util.js';

let ServiceFramework = require('service-framework');
let MessageFactory = new ServiceFramework.MessageFactory(false,{});

describe('hyperty address-allocation spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  let runtimeURL     = "runtime://" + stubConfig.domain + "/1";
  let runtimeStubURL = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';
  let msgNodeAddress = "domain://msg-node." + stubConfig.domain + "/hyperty-address-allocation";
  let address;
  let addresses;
  let allocationKey = runtimeStubURL + "/hypertyAllocationKey";

  it('allocate single hyperty address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          msg = {
            // NOTE: MessageFactory does not support body.scheme field --> creating message manually
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 1,
            type: "create",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              scheme: "SCHEME-TO-BE-IGNORED",
              value : {
                number: 1
              }
            }
          };
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the allocation response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(1);
          address = m.body.value.allocated[0];

          stub.disconnect();
          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  });


  it('ignore scheme', function(done) {
    expect(address.startsWith("hyperty://")).to.be.true;
    done();
  });

  it('de-allocate single hyperty address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // delete the allocation of address from tc 1
          msg = MessageFactory.createDeleteMessageRequest(
            runtimeStubURL + "/registry/allocation", // from
            msgNodeAddress, // to
            [address], // body.childrenResources
            "attribute" // attribute
          );
          bus.sendStubMsg(msg);
          break;
        case 2:
          // this message is expected to be the delete response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          stub.disconnect();
          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  });


  it('allocate block of hyperty addresses', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // allocate addresses without an allocationKey
          msg = MessageFactory.createCreateMessageRequest(
            runtimeStubURL + "/registry/allocation", // from
            msgNodeAddress, // to
            { // body.value
              number: 3
            },
            "policyURL" // policy
          );
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the allocation response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(3);
          addresses = m.body.value.allocated;

          stub.disconnect();
          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  });

  it('de-allocate block of hyperty addresses', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // delete the allocation of previously allocated address block
          msg = MessageFactory.createDeleteMessageRequest(
            runtimeStubURL + "/registry/allocation", // from
            msgNodeAddress, // to
            addresses, // body.childrenResources
            "attribute" // attribute
          );
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the delete response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          stub.disconnect();
          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  });


  it('allocate block of hyperty addresses with allocationKey', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // allocate addresses with an allocationKey
          msg = MessageFactory.createCreateMessageRequest(
            runtimeStubURL + "/registry/allocation", // from
            msgNodeAddress, // to
            { // body.value
              number: 4,
              allocationKey : allocationKey
            },
            "policyURL" // policy
          );
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the allocation response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(4);

          stub.disconnect();
          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  });

  it('de-allocate block of hyperty addresses by allocationKey', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // delete the allocation of address block by allocationKey
          msg = MessageFactory.createDeleteMessageRequest(
            runtimeStubURL + "/registry/allocation", // from
            msgNodeAddress, // to
            allocationKey, // body.resource
            "attribute" // attribute
          );
          bus.sendStubMsg(msg);
          break;
        case 2:
          // this message is expected to be the delete response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          stub.disconnect();

          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  });
});
