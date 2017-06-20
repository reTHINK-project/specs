/**
* Copyright 2016 PT Inovação e Sistemas SA
* Copyright 2016 INESC-ID
* Copyright 2016 QUOBIS NETWORKS SL
* Copyright 2016 FRAUNHOFER-GESELLSCHAFT ZUR FOERDERUNG DER ANGEWANDTEN FORSCHUNG E.V
* Copyright 2016 ORANGE SA
* Copyright 2016 Deutsche Telekom AG
* Copyright 2016 Apizee
* Copyright 2016 TECHNISCHE UNIVERSITAT BERLIN
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

import expect from 'expect.js';
import StubLoader  from './StubLoader.js';
import Bus         from './Bus.js';
import Util        from './Util.js';


describe('subscription and syncher spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  let msgNodeAddress = "domain://msg-node." + stubConfig.domain;
  let address;

  let runtimeURLReporter     = "runtime://" + stubConfig.domain + "/Reporter";
  let runtimeStubURLReporter = 'hyperty-runtime://' + stubConfig.domain + '/protostub/Reporter';
  let stubReporter;
  let busReporter;

  let runtimeURLSubscriber     = "runtime://" + stubConfig.domain + "/Subscriber";
  let runtimeStubURLSubscriber = 'hyperty-runtime://' + stubConfig.domain + '/protostub/Subscriber';
  let stubSubscriber;
  let busSubscriber;

  let runtimeURLSubscriber2     = "runtime://" + stubConfig.domain + "/Subscriber2";
  let runtimeStubURLSubscriber2 = 'hyperty-runtime://' + stubConfig.domain + '/protostub/Subscriber2';
  let stubSubscriber2;
  let busSubscriber2;


  it('allocate object address', function(done) {

    busReporter = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURLReporter, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURLReporter, num);

          // not using MessageFactory, because it does not support "scheme"
          let msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 1,
            type: "create",
            from: runtimeStubURLReporter + "/registry/allocation",
            to: msgNodeAddress + "/address-allocation",
            body: {
              scheme: "connection",
              value : {
                number: 1
              }
            }
          };
          busReporter.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the allocation response
          expect(m.id).to.eql("1");
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress + "/address-allocation");
          expect(m.to).to.eql(runtimeStubURLReporter + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(1);
          // remember object address
          address = m.body.value.allocated[0];

          // don't disconnect the Reporter Stub
          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stubReporter = stubLoader.activateStub(runtimeStubURLReporter, busReporter, runtimeURLReporter);
    stubReporter.connect();
  });


  it('subscribe for object address with body.source', function(done) {
    let msg;

    busSubscriber = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURLSubscriber, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURLSubscriber, num);

          // NOTE: there is no support for a SubscribeMessageBody in the MessageFactory --> creating msg manually
          msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 2,
            type: "subscribe",
            from: runtimeStubURLSubscriber + "/sm",
            to: msgNodeAddress + "/sm",
            body: {
              resources: [address + "/changes", address + "/children/name1"],
              source : runtimeStubURLSubscriber
            }
          };
          busSubscriber.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the subscription response
          expect(m.id).to.eql("2");
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress + "/sm");
          expect(m.to).to.eql(runtimeStubURLSubscriber + "/sm");
          expect(m.body.code).to.eql(200);

          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stubSubscriber = stubLoader.activateStub(runtimeStubURLSubscriber, busSubscriber, runtimeURLSubscriber);
    stubSubscriber.connect();
  });


  it('subscribe for object address without body.source', function(done) {
    let msg;

    busSubscriber2 = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURLSubscriber2, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURLSubscriber2, num);

          // NOTE: there is no support for a SubscribeMessageBody in the MessageFactory --> creating msg manually
          msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 2,
            type: "subscribe",
            from: runtimeStubURLSubscriber2 + "/sm",
            to: msgNodeAddress + "/sm",
            body: {
              resources: [address + "/changes", address + "/children/name1"]
            }
          };
          busSubscriber2.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the subscription response
          expect(m.id).to.eql("2");
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress + "/sm");
          expect(m.to).to.eql(runtimeStubURLSubscriber2 + "/sm");
          expect(m.body.code).to.eql(200);

          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    stubSubscriber2 = stubLoader.activateStub(runtimeStubURLSubscriber2, busSubscriber2, runtimeURLSubscriber2);
    stubSubscriber2.connect();
  });


  it('publish attribute update and receive update on both subscribers', function(done) {
    let msg;

    busSubscriber.setStubMsgHandler((m, num) => {
      switch (num) {
        case 5:
          // this message is expected to be the incoming update msg
          expect(m.id).to.eql("1");
          expect(m.type.toLowerCase()).to.eql("update");
          expect(m.from).to.eql(address);
          expect(m.to).to.eql(address + "/changes");
          expect(m.body.attribute).to.eql("changedAttribute");
          expect(m.body.value).to.eql("new Value");

        default:
      }
    },
    // enable / disable log of received messages
    false);

    busSubscriber2.setStubMsgHandler((m, num) => {
      switch (num) {
        case 5:
          // this message is expected to be the incoming update msg
          expect(m.id).to.eql("1");
          expect(m.type.toLowerCase()).to.eql("update");
          expect(m.from).to.eql(address);
          expect(m.to).to.eql(address + "/changes");
          expect(m.body.attribute).to.eql("changedAttribute");
          expect(m.body.value).to.eql("new Value");

          done();

        default:
      }
    },
    // enable / disable log of received messages
    false);

    // let the Reporter publish an update to the object
    msg = {
      id: 1,
      type: "update",
      from: address,
      to: address + "/changes",
      body: {
        attribute: "changedAttribute",
        value : "new Value"
      }
    };
    // send update msg via the Reporters stub
    busReporter.sendStubMsg(msg);

  });


  it('unsubscribe both subscribers', function(done) {
    let msg;
    let msg2;

    busSubscriber.setStubMsgHandler((m, num) => {
      switch (num) {
        case 6:
          // this message is expected to be the unsubscribe response
          expect(m.id).to.eql("3");
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress + "/sm");
          expect(m.to).to.eql(runtimeStubURLSubscriber + "/sm");
          expect(m.body.code).to.eql(200);

        default:
      }
    },
    // enable / disable log of received messages
    false);

    busSubscriber2.setStubMsgHandler((m, num) => {
      switch (num) {
        case 6:
          // this message is expected to be the unsubscribe response
          expect(m.id).to.eql("3");
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress + "/sm");
          expect(m.to).to.eql(runtimeStubURLSubscriber2 + "/sm");
          expect(m.body.code).to.eql(200);

          done();
        default:
      }
    },
    // enable / disable log of received messages
    false);

    // NOTE: there is no support for a SubscribeMessageBody in the MessageFactory --> creating msg manually
    msg = {
      // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
      id: 3,
      type: "unsubscribe",
      from: runtimeStubURLSubscriber + "/sm",
      to: msgNodeAddress + "/sm",
      body: {
        resources: [address + "/changes", address + "/children/name1"]
      }
    };
    msg2 = {
      // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
      id: 3,
      type: "unsubscribe",
      from: runtimeStubURLSubscriber2 + "/sm",
      to: msgNodeAddress + "/sm",
      body: {
        resources: [address + "/changes", address + "/children/name1"]
      }
    };

    busSubscriber.sendStubMsg(msg);
    busSubscriber2.sendStubMsg(msg2);
  });

  it('publish second attribute update and dont receive update on both subscribers', function(done) {
    let msg;

    busSubscriber.setStubMsgHandler((m, num) => {
      if ( m.type.toLowerCase === "update" )
        fail("subscriber 1 should not receive an update message")
      },
      // enable / disable log of received messages
      false);

    busSubscriber2.setStubMsgHandler((m, num) => {
      if ( m.type.toLowerCase === "update" )
        fail("subscriber 2 should not receive an update message")
      },
      // enable / disable log of received messages
      false);

    // let the Reporter publish an update to the object
    msg = {
      id: 2,
      type: "update",
      from: address,
      to: address + "/changes",
      body: {
        atrribute: "changedAttribute",
        value : "a second new Value"
      }
    };
    // send update msg via the Reporters stub
    busReporter.sendStubMsg(msg);

    // lets wait a while for a potential update message
    console.log("waiting a while for update messages ...")
    setTimeout(() => {
      console.log("done --> cleaning up")
      stubReporter.disconnect();
      stubSubscriber.disconnect();
      stubSubscriber2.disconnect();
      done()
    }, 1500 );

  });

});
