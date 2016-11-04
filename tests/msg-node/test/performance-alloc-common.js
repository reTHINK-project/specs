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

import Bus from './Bus.js';
import Util from './Util.js';
import StubLoader from './StubLoader.js';
let ServiceFramework = require('service-framework');
let MessageFactory = new ServiceFramework.MessageFactory(false, {});

export default class AllocCommon {

  constructor () {
    this.stubLoader = new StubLoader();
    this.domain = this.stubLoader.config.domain;
    this.util = new Util(this.stubLoader.stubType);
    this.bus;
    this.stub;
    this.addresses = [];
    this.allocationKeys = [];
    this.runtimeURL = "runtime://" + this.domain + "/1";
    this.runtimeStubRegistryURL = 'hyperty-runtime://' + this.domain + '/protostub/1/registry/allocation"';
    this.hypertyAllocationAddress = "domain://msg-node." + this.domain + "/hyperty-address-allocation";
    this.objectAllocationAddress  = "domain://msg-node." + this.domain + "/object-address-allocation";
  }

  prepare(done) {
    let msg;

    this.bus = new Bus((m, num) => {
        switch (num) {
          case 1:
            this.util.expectConnected(m, this.runtimeStubRegistryURL);
            console.timeEnd("prepare");
            done();
          default:
        }
      },
      // enable / disable log of received messages
      false);

      console.time("prepare");
    this.stub = this.stubLoader.activateStub(this.runtimeStubRegistryURL, this.bus, this.runtimeURL);
    this.stub.connect();
  }

  disconnect(done) {
    let msg;

    this.bus.setStubMsgHandler((m, num) => {
        this.util.expectDisconnected(m, this.runtimeStubRegistryURL);
        done();
      },
      // enable / disable log of received messages
      false);

    this.stub.disconnect;
  }

  allocLoop(type, max, numberOfAddressesPerRequest, done, withKey) {
    let msg;
    let count = 0;
    let start = Date.now();
    let mnAddress = (type === "hyperty") ? this.hypertyAllocationAddress : this.objectAllocationAddress;
    //console.time(type + "," + max + "," + numberOfAddressesPerRequest + "," + withKey);
    console.time("test");

    this.bus.setStubMsgHandler((m, num) => {
        count++;

        // this message is expected to be the allocation response
        expect(m.type.toLowerCase()).to.eql("response");
        expect(m.from).to.eql(mnAddress);
        expect(m.to).to.eql(this.runtimeStubRegistryURL);
        expect(m.body.code).to.eql(200);
        expect(m.body.value.allocated.length).to.be(numberOfAddressesPerRequest);
        this.addresses.push(m.body.value.allocated);

        if ((count % 1000) == 0)
          console.log(count);
        if (count == max) {
          // console.timeEnd(type + "," + max + "," + numberOfAddressesPerRequest + "," + withKey);
          console.timeEnd("test");
          let stop = Date.now();
          // console.log("Duration for allocation of " + max + " x " + numberOfAddressesPerRequest + " addresses " +
          //   (withKey ? "with allocationKey: " : ":") + (stop - start) + " msecs");

          this.util.log("Duration for allocation of " + max + " x " + numberOfAddressesPerRequest + " addresses " +
            (withKey ? "with allocationKey" : ""), (stop - start));
            done();
          return;
        }
      },
      // enable / disable log of received messages
      false);

    for (var i = 1; i <= max; i++) {
      // // create and send the allocation request
      // msg = MessageFactory.createCreateMessageRequest(
      //   this.runtimeStubRegistryURL, // from
      //   mnAddress, // to
      //   value, // body.value
      //   "policyURL" // attribute
      // );
      // // not using MessageFactory, because it does not support "scheme"
      msg = {
        id: i,
        type: "create",
        from: this.runtimeStubRegistryURL,
        to: mnAddress,
        body: {
          scheme: "connection Steffen",
          value : { number: numberOfAddressesPerRequest }
        }
      };
      if ( withKey ) {
        msg.body.value.allocationKey = "allocationKey" + i;
        this.allocationKeys.push("allocationKey" + i);
      }

      this.bus.sendStubMsg(msg);
    }
  }

  deallocLoop(type, done, withKey) {
    let max = this.addresses.length;
    let msg;
    let count = 0;
    let numberOfAddressesPerRequest = withKey ? 3 : -1;
    let mnAddress = (type === "hyperty") ? this.hypertyAllocationAddress : this.objectAllocationAddress;
    let start = Date.now();

    this.bus.setStubMsgHandler((m, num) => {
        count++;

        // this message is expected to be the allocation response
        expect(m.type.toLowerCase()).to.eql("response");
        expect(m.from).to.eql(mnAddress);
        expect(m.to).to.eql(this.runtimeStubRegistryURL);
        expect(m.body.code).to.eql(200);

        if ((count % 1000) == 0)
          console.log(count);
        if (count == max) {
          let stop = Date.now();
          console.log("Duration for de-allocation of " + max + " x " + numberOfAddressesPerRequest + " addresses " +
            (withKey ? "with allocationKey: " : ":") + (stop - start) + " msecs");
          this.addresses.splice(0, this.addresses.length);
          done();
          return;
        }
      },
      // enable / disable log of received messages
      false);

    if ( ! withKey ) {
      for (var i = 0; i < this.addresses.length; i++ ) {
        if ( numberOfAddressesPerRequest == -1 )
          numberOfAddressesPerRequest = this.addresses[i].length;

        // create and send the de-allocation request
        msg = MessageFactory.createDeleteMessageRequest(
          this.runtimeStubRegistryURL, // from
          mnAddress, // to
          this.addresses[i], // body.childrenResources
          "attribute" // attribute
        );
        this.bus.sendStubMsg(msg);
      }
    }
    else {
      for (var i = 0; i < this.allocationKeys.length; i++ ) {
        // create and send the de-allocation request
        msg = MessageFactory.createDeleteMessageRequest(
          this.runtimeStubRegistryURL, // from
          mnAddress, // to
          this.allocationKeys[i], // body.resource
          "attribute" // attribute
        );
        this.bus.sendStubMsg(msg);
      }
    }
  }
}
