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
