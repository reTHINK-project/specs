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

describe('hyperty registration spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  // let runtimeURL = 'hyperty-runtime://' + stubConfig.domain + '/1';
  let runtimeURL = 'runtime://' + stubConfig.domain + '/1';
  let runtimeStubURL = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';
  let msgNodeAddress = "domain://msg-node." + stubConfig.domain + "/address-allocation";
  let mnRegistryAddress = "domain://registry." + stubConfig.domain;
  let address;
  let userId = 'user://google.com/openIdTest10';
  let hypertyDescriptorURL = 'http://' + stubConfig.domain + '/RegistrationTestHyperty';
  let dataScheme = 'TestSchema';
  let testresource = "testresource";

  let busSubscriber;
  let stubSubscriber;


  it('allocate and register address', function(done) {
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

          // allocate addresses without an allocationKey
          msg = {
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


          msg = {
            id: 1,
            type: "create",
            from: runtimeURL + "/registry",
            to: mnRegistryAddress,
            body: {
              value: {
                url: address,
                descriptor: hypertyDescriptorURL,
                user: userId,
                expires: 3600,
                status: "live",
                dataSchemes : [dataScheme],
                resources : [testresource],
                runtime : runtimeURL
              }, // body.value
              policyURL : "policyURL" // body.policyURL
            }
          };

          // msg = MessageFactory.createCreateMessageRequest(
          //   runtimeURL + "/registry", // from runtime, not hyperty
          //   mnRegistryAddress, // to
          //   {
          //     url: address,
          //     descriptor: hypertyDescriptorURL,
          //     user: userId,
          //     expires: 3600,
          //     status: "live",
          //     dataSchemes : [dataScheme],
          //     resources : [testresource],
          //     runtime : runtimeURL
          //   }, // body.value
          //   "policyURL" // policyURL
          // );
          bus.sendStubMsg(msg);
          break;

        case 5:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(runtimeURL + "/registry");
          expect(m.body.code).to.eql(200);

          stub.disconnect();
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


  let testReadOperation = (done, expectedCode, body) => {
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
            type: "read",
            from: runtimeURL + "/registry",
            to: mnRegistryAddress,
            body : body
          }

          bus.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(runtimeURL + "/registry");
          expect(m.body.code).to.eql(expectedCode);
          if ( expectedCode === 200 ) {
            expect(m.body.value[address]).not.to.be.null;
          }

          stub.disconnect();
          done();
          break;

        default:
      }
    },
    // enable / disable log of received messages
    false);
    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  };


  it('search registry data by user', function(done) {
    testReadOperation( done, 200,
      {
        resource: userId
      }
    );
  });

  it('search registry data by user and scheme', function(done) {
    testReadOperation( done, 200,
      {
        resource: userId,
        criteria : {
          dataSchemes : [dataScheme]
        }
      });
  });

  it('search registry data by user and resources', function(done) {
    testReadOperation( done, 200,
      {
        resource: userId,
        criteria : {
          resources : [testresource]
        }
      });
  });

  it('search registry data by user, resources and dataSchemes', function(done) {
    testReadOperation( done, 200,
      {
        resource: userId,
        criteria : {
          resources : [testresource],
          dataSchemes : [dataScheme]
        }
      });
  });

  it('search registry data by address', function(done) {
    testReadOperation( done, 200,
      {
        resource: address
      });
  })

  it('search for non-existing registry object', function(done) {
    testReadOperation( done, 404,
      {
        resource: 'schema://' + stubConfig.domain + '/non-existing-object'
      });
  })

  let testMessage = (done, msg, expectedCode) => {
    let stub;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          bus.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msg.to);
          expect(m.to).to.eql(msg.from);
          expect(m.body.code).to.eql(expectedCode);

          stub.disconnect();
          done();
          break;
        default:
      }
    },
    // enable / disable log of received messages
    false);
    stub = stubLoader.activateStub(runtimeStubURL, bus, runtimeURL);
    stub.connect();
  };

  it('keep registration alive', function(done) {
    let msg =  {
      id: 1,
      type: "update",
      from: runtimeURL + "/registry",
      to: mnRegistryAddress,
      body: {
        resource: address
      }
    }

    testMessage(done, msg, 200);
  });


  it('subscribe for registration status updates', function(done) {
    let msg;
    // connect separate stub/bus to MN and subscribe for registration status updates
    busSubscriber = new Bus( (m, num) => {
      switch (num) {
        case 1:
        case 2:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          break;
        case 3:
          util.expectStubSuccessSequence(m, runtimeStubURL, num);
          msg =  {
            id: 1,
            type: "subscribe",
            from: runtimeURL + "/registry",
            to: "domain://msg-node." + stubConfig.domain + "/sm",
            body: {
              resources: [address + "/registration"]
            }
          }
          busSubscriber.sendStubMsg(msg);
          break;

        case 4:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(msg.to);
          expect(m.to).to.eql(msg.from);
          expect(m.body.code).to.eql(200);

          // don't disconnect
          done();
        default:
      }
    },
    // enable / disable log of received messages
    false);
    stubSubscriber = stubLoader.activateStub(runtimeStubURL, busSubscriber, runtimeURL);
    stubSubscriber.connect();
  });


  it('receive registration status updates', function(done) {
    // connect separate stub/bus to MN and subscribe for registration status updates
    busSubscriber.setStubMsgHandler((m, num) => {
      switch (num) {
        case 5:
          // this message is expected to be the incoming update msg
          expect(m.id).to.eql("1");
          expect(m.type.toLowerCase()).to.eql("update");
          expect(m.from).to.eql(address);
          expect(m.to).to.eql(address + "/changes");
          expect(m.body.attribute).to.eql("status");
          expect(m.body.value).to.eql("disconnected");

          busSubscriber.disconnect();
          done();
        default:
      }
    },
    // enable / disable log of received messages
    false);

    // update status to disconnected
    let msg = {
      id: 1,
      type: "update",
      from: runtimeURL + "/registry",
      to: mnRegistryAddress,
      body: {
        resource: address,
        value : "disconnected",
        attribute : "status"
      }
    }
    // invoke testMessage with faked done method
    testMessage(()=>{}, msg, 200);
  });


  it('unregister hyperty address', function(done) {
    let msg = {
      id: 1,
      type: "update",
      from: runtimeURL + "/registry",
      to: mnRegistryAddress,
      body: {
        resource: address,
        value : "disconnected",
        attribute : "status"
      }
    }
    testMessage(done, msg, 200);
  });

});
