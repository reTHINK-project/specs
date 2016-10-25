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

let ServiceFramework = require('service-framework');
let MessageFactory = new ServiceFramework.MessageFactory(false,{});

describe('object address-allocation spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  let runtimeURL     = "runtime://" + stubConfig.domain + "/1";
  let runtimeStubURL = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';
  let msgNodeAddress = "domain://msg-node." + stubConfig.domain + "/object-address-allocation";
  let address;
  let addresses;
  let allocationKey = runtimeStubURL + "/objectAllocationKey";

  it('allocate single object address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // not using MessageFactory, because it does not support "scheme"
          msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 1,
            type: "create",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              scheme: "connection",
              value : {
                number: 1
              }
            }
          };
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the allocation response
          expect(m.id).to.eql("1");
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(1);
          // must start with requested scheme
          expect(m.body.value.allocated[0].indexOf("connection://")).to.be(0);
          // remember address
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

  it('de-allocate single object address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // delete the single object allocation
          msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 2,
            type: "delete",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              childrenResources : [address]
            }
          };
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the delete response
          expect(m.id).to.eql("2");
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


  it('allocate block of object addresses', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          // allocate addresses without an allocationKey
          // not using MessageFactory, because it does not support "scheme"
          msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 2,
            type: "create",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              scheme: "comm",
              value : {
                number: 3
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
          expect(m.body.value.allocated.length).to.be(3);
          addresses = m.body.value.allocated;
          console.log("got addresses: ", addresses);

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


  it('de-allocate block of object addresses', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
        case 1:
          util.expectConnected(m, runtimeStubURL);
          // delete the allocation of address block
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


  it('allocate block of object addresses with allocationKey', function(done) {
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

  it('de-allocate block of object addresses by allocationKey', function(done) {
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
