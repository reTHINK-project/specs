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

const STUB_STATE = {
  CREATED     : "created",
  IN_PROGRESS : "in-progress",
  LIVE        : "live",
  FAILED      : "failed",
  DISCONNECTED: "disconnected"
}

export default class Util {


  constructor(mnType) {
    this.mnType = mnType;
  }

  expectStubSuccessSequence(m, runtimeStubURL, index) {
    switch (index) {
      case 1:
        this.expectStubStatus(m, runtimeStubURL, STUB_STATE.CREATED);
        break;
      case 2:
        this.expectStubStatus(m, runtimeStubURL, STUB_STATE.IN_PROGRESS);
        break;
      case 3:
        this.expectStubStatus(m, runtimeStubURL, STUB_STATE.LIVE);
        break;
      default:
    }
  }

  expectStubDisconnected(m, runtimeStubURL) {
    this.expectStubStatus(m, runtimeStubURL, STUB_STATE.DISCONNECTED);
  }

  expectStubStatus(m, runtimeStubURL, status) {
    expect(m.type).to.eql("update");
    expect(m.from).to.eql(runtimeStubURL);
    expect(m.to).to.eql(runtimeStubURL + "/status");
    expect(m.body.value).to.eql(status);
  }

  log(msg, value) {
    console.info(this.mnType + " - " + msg + ': ' + value);
  }

}
