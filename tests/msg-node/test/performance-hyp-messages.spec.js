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
import StubLoader from './StubLoader.js';
import Bus from './Bus.js';
import Util from './Util.js';

let ServiceFramework = require('service-framework');
let MessageFactory = new ServiceFramework.MessageFactory(false, {});

describe('messaging performance for different message sizes and iterations', function() {
  this.timeout(100000);

  let stubLoader = new StubLoader();
  let stubConfig = stubLoader.config;
  let util = new Util(stubLoader.stubType);

  let msgNodeAddress = "domain://msg-node." + stubConfig.domain + "/hyperty-address-allocation";
  let address2;
  let address1;

  let runtimeURL1 = "runtime://" + stubConfig.domain + "/1";
  let runtimeStubURL1 = 'hyperty-runtime://' + stubConfig.domain + '/protostub/1';
  let stub1;
  let bus1;

  let runtimeURL2 = "runtime://" + stubConfig.domain + "/2";
  let runtimeStubURL2 = 'hyperty-runtime://' + stubConfig.domain + '/protostub/2';
  let stub2;
  let bus2;


  it('prepare: connect 2 stubs and allocate hyperties 1 and 2', function(done) {
    let msg;

    bus1 = new Bus((m, num) => {
        switch (num) {
          case 1:
            util.expectConnected(m, runtimeStubURL1);

            // delete the allocation of address from tc 1
            msg = MessageFactory.createCreateMessageRequest(
              runtimeStubURL1 + "/registry/allocation", // from
              msgNodeAddress, // to
              {
                number: 1
              }, // body.value
              "policyURL" // attribute
            );
            bus1.sendStubMsg(msg);
            break;

          case 2:
            // shortened test
            expect(m.type.toLowerCase()).to.eql("response");
            expect(m.body.code).to.eql(200);
            expect(m.body.value.allocated.length).to.be(1);
            address1 = m.body.value.allocated[0];

          default:
        }
      },
      // enable / disable log of received messages
      false);

    bus2 = new Bus((m, num) => {
        switch (num) {
          case 1:
            util.expectConnected(m, runtimeStubURL2);

            // allocate address
            msg = MessageFactory.createCreateMessageRequest(
              runtimeStubURL1 + "/registry/allocation", // from
              msgNodeAddress, // to
              {
                number: 1
              }, // body.value
              "policyURL" // attribute
            );
            bus2.sendStubMsg(msg);
            break;

          case 2:
            // shortened test
            expect(m.type.toLowerCase()).to.eql("response");
            expect(m.body.code).to.eql(200);
            expect(m.body.value.allocated.length).to.be(1);
            address2 = m.body.value.allocated[0];

            done();
          default:
        }
      },
      // enable / disable log of received messages
      false);

    stub1 = stubLoader.activateStub(runtimeStubURL1, bus1, runtimeURL1);
    stub1.connect();

    stub2 = stubLoader.activateStub(runtimeStubURL2, bus2, runtimeURL2);
    stub2.connect();
  });

  let messageLoop = (max, payload, done) => {
    let msg;
    let count = 0;
    let start = Date.now();
    let stop;

    bus2.setStubMsgHandler((m, num) => {
        count++;
        // this message is expected to be the incoming update msg
        expect(m.type.toLowerCase()).to.eql("create");
        expect(m.from).to.eql(address1);
        expect(m.to).to.eql(address2);
        expect(m.body.value).to.eql({ data: payload + count });

        if ((count % 1000) == 0)
          console.log(count);
        if (count >= max) {
          stop = Date.now();
          util.log("Duration for "+max+" messages of size " + payload.length + ": ", (stop - start));
          done();
        }
      },
      // enable / disable log of received messages
      false);

    for (var i = 1; i <= max; i++) {
      // let the Reporter publish an update to the object
      msg = MessageFactory.createCreateMessageRequest(
        address1, // from
        address2, // to
        { data: payload + i }, // body.value
        "policyURL" // attribute
      );
      // console.log("sending msg number: " + i);
      // send msg via stub 1
      bus1.sendStubMsg(msg);
    }

  }

  // credits for stringFill3 go to: http://www.webreference.com/programming/javascript/jkm3/3.html
  let stringFill3 = (x, n) => {
    var s = '';
    for (;;) {
      if (n & 1) s += x;
      n >>= 1;
      if (n) x += x;
      else break;
    }
    return s;
  }

  let msg100B = stringFill3("x", 100);
  let msg1kB = stringFill3("x", 1024);
  let msg10kB = stringFill3("x", 10240);

  it('send 100B x 100 times', function(done) {
    messageLoop(100, msg100B, done);
  });

  it('send 1kB x 100 times', function(done) {
    messageLoop(100, msg1kB, done);
  });

  it('send 10kB x 100 times', function(done) {
    messageLoop(100, msg10kB, done);
  });


  it('send 100B x 1000 times', function(done) {
    messageLoop(1000, msg100B, done);
  });

  it('send 1kB x 1000 times', function(done) {
    messageLoop(1000, msg1kB, done);
  });

  it('send 10kB x 1000 times', function(done) {
    messageLoop(1000, msg10kB, done);
  });


  it('send 100B x 10000 times', function(done) {
    messageLoop(10000, msg100B, done);
  });

  it('send 1kB x 10000 times', function(done) {
    messageLoop(10000, msg1kB, done);
  });

  it('send 10kB x 10000 times', function(done) {
    messageLoop(10000, msg10kB, done);
  });
});
