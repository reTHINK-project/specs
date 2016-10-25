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

describe('hyperty registration spec', function() {

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util();

  let runtimeURL = 'runtime://' + stubConfig.domain + '/1';
  let runtimeStubURL = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';
  let msgNodeAddress = "domain://msg-node." + stubConfig.domain + "/hyperty-address-allocation";
  let mnRegistryAddress = "domain://registry." + stubConfig.domain;
  let hypertyRuntimeURL     = "hyperty-runtime://" + stubConfig.domain + "/runtime-1/registry";
  let address;
  let userId = 'user://google.com/openIdTest10';
  let hypertyDescriptorURL = 'http://' + stubConfig.domain + '/RegistrationTestHyperty';
  let dataSchemeURL = 'http://' + stubConfig.domain + '/RegistrationTestSchema';
  let testresource = "testresource";

  it('register hyperty address', function(done) {
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
              number: 1
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
          expect(m.body.value.allocated.length).to.be(1);
          address = m.body.value.allocated[0];

          msg = MessageFactory.createCreateMessageRequest(
            runtimeStubURL + "/registry", // from runtime, not hyperty
            mnRegistryAddress, // to
            {
              user: userId,
              descriptor: hypertyDescriptorURL,
              url: address,
              expires: 3600,
              resources : [testresource],
              dataSchemes : [dataSchemeURL]
            }, // body.value
            "policyURL" // policyURL
          );
          bus.sendStubMsg(msg);
          break;

        case 3:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry");
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

  it('read hyperty address by user', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          msg = MessageFactory.createReadMessageRequest(
            hypertyRuntimeURL, // from runtime, not hyperty
            mnRegistryAddress, // to
            userId, // body.resource
            "attribute" // attribute
          );
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(hypertyRuntimeURL);
          expect(m.body.code).to.eql(200);
          expect(m.body.value[address]).not.to.be.null;

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

  it('read hyperty with search criterias for resource and scheme', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          msg = {
            // NOTE: MessageFactory does not support body.critera field --> creating message manually
            id: 1,
            type: "read",
            from: hypertyRuntimeURL,
            to: mnRegistryAddress,
            body: {
              resource : userId,
              criteria : {
                "resources" : [testresource],
                dataSchemes : [dataSchemeURL]
              }
            }
          };

          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(hypertyRuntimeURL);
          expect(m.body.code).to.eql(200);
          expect(m.body.value).not.to.be.null;

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

  it('read full hyperty data by known hyperty-URL ', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          msg = {
            // NOTE: MessageFactory does not support body.critera field --> creating message manually
            id: 1,
            type: "read",
            from: hypertyRuntimeURL,
            to: mnRegistryAddress,
            body: {
              resource : userId,
              criteria : {
                "resources" : [testresource],
                dataSchemes : [dataSchemeURL]
              }
            }
          };

          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(hypertyRuntimeURL);
          expect(m.body.code).to.eql(200);
          expect(m.body.value).not.to.be.null;

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

  it('keep registration alive', function(done) {
    let stub;
    let msg;

    console.log("The \"keep-alive\" test WILL FAIL!, because the Spec. differs from what the RegistryConnector implements.")
    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          msg = MessageFactory.createUpdateMessageRequest(
            hypertyRuntimeURL, // from runtime/registry
            mnRegistryAddress, // to
            "dummy value to make the MessageFactory happy", // value
            address, // body.resource
            "attribute" // attribute
          );
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(hypertyRuntimeURL);
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

  it('unregister hyperty address', function(done) {
    let stub;
    let msg;

    let bus = new Bus( (m, num) => {
      switch (num) {
        case 1:
          util.expectConnected(m, runtimeStubURL);

          console.log("This message specification is unclear! It does not contain any hyperty identifier! see issue at: https://github.com/reTHINK-project/specs/issues/10")
          msg = MessageFactory.createUpdateMessageRequest(
            runtimeStubURL + "/registry", // from runtime, not hyperty
            mnRegistryAddress, // to
            "disconnected", // value
            // hypertyRuntimeURL, // body.resource
            "status" // attribute
          );
          bus.sendStubMsg(msg);
          break;

        case 2:
          // this message is expected to be the registration response
          expect(m.id).to.eql(msg.id);
          expect(m.type.toLowerCase()).to.eql("response");
          expect(m.from).to.eql(mnRegistryAddress);
          expect(m.to).to.eql(runtimeStubURL + "/registry");
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


});
