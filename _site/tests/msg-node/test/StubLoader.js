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

import matrixActivate   from '../src/stub/MatrixProtoStub.js';
import matrixConfig     from "../src/stub/matrix.conf.js";
import vertxActivate    from '../src/stub/VertxProtoStub.js';
import vertxConfig      from "../src/stub/vertx.conf.js";
import nodejsActivate   from '../src/stub/NodejsProtoStub.js';
import nodejsConfig     from "../src/stub/nodejs.conf.js";


export default class StubLoader {
  constructor() {
    this.stubType = window.__karma__.config.args[0];

    if ( ! this.stubType )
      this.stubType = "matrix";

    switch (this.stubType) {
      case "matrix":
        this.activate = matrixActivate;
        this.config = matrixConfig;
        break;
      case "vertx":
        this.activate = vertxActivate;
        this.config = vertxConfig;
        break;
      case "nodejs":
        this.activate = nodejsActivate;
        this.config = nodejsConfig;
        break;
      default:
    }
  }

  activateStub(runtimeStubURL, bus, runtimeURL) {
    this.config.runtimeURL = runtimeURL;
    return this.activate(runtimeStubURL, bus, this.config).instance;
  }
}
