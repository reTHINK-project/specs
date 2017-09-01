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

describe('hyperty address-allocation spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  let runtimeURL     = "runtime://" + stubConfig.domain + "/1";
  let runtimeStubURL = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';
  let msgNodeAddress = "domain://msg-node." + stubConfig.domain + "/address-allocation";
  let address;
  let addresses;
  let allocationKey = runtimeStubURL + "/hypertyAllocationKey";

  it('allocate single hyperty address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          msg = {
            // NOTE: MessageFactory does not support body.scheme field --> creating message manually
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 1,
            type: "create",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              scheme: "hyperty",
              value : {
                number: 1
              }
            }
          };
          bus.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the allocation response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(1);
          address = m.body.value.allocated[0];
          expect(address.startsWith("hyperty")).to.be.true;

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

  it('de-allocate single hyperty address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);

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

        case 4:
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



  it('allocate block of hyperty addresses', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);

          msg = {
            id: 1,
            type: "create",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              scheme: "hyperty",
              value : {
                number: 3
              }
            }
          };

          bus.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the allocation response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msgNodeAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry/allocation");
          expect(m.body.code).to.eql(200);
          expect(m.body.value.allocated.length).to.be(3);
          addresses = m.body.value.allocated;
          for (var address in addresses) {
            expect(address.startsWith("hyperty")).to.be.true;
          }

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
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);

          // delete the allocation of previously allocated address block
          msg = {
            // NOTE: According to the spec, id should be a String, but at least Vertx breaks if it really is --> relaxing test
            id: 2,
            type: "delete",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              childrenResources : [addresses]
            }
          };
          bus.sendStubMsg(msg);
          break;

        case 4:
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
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);

          // allocate addresses with an allocationKey
          msg = {
            id: 1,
            type: "create",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              scheme: "hyperty",
              value : {
                number: 4,
                allocationKey : allocationKey
              },
            }
          };
          bus.sendStubMsg(msg);
          break;

        case 4:
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
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);

          // delete the allocation of address block by allocationKey
          msg = {
            id: 2,
            type: "delete",
            from: runtimeStubURL + "/registry/allocation",
            to: msgNodeAddress,
            body: {
              resource : allocationKey
            }
          };
          bus.sendStubMsg(msg);
          break;
        case 4:
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
