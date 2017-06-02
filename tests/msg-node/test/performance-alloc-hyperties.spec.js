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
import AllocUtil from './performance-alloc-common.js';


describe('Hyperty address allocation performance for different numbers of addresses', function() {
  this.timeout(30000);

  let allocUtil = new AllocUtil();

  it('prepare: connect stub', function(done) {
    allocUtil.prepare(done);
  });

  /********** 100 iterations  ********************/

  it('100 hyperty address allocation requests for 1 address each ', function(done) {
    allocUtil.allocLoop( "hyperty", 100, 1, done);
  });

  it('100 hyperty address de-allocation requests for 1 address each ', function(done) {
    allocUtil.deallocLoop( "hyperty", done);
  });

  it('100 hyperty address allocation requests for 3 addresses each ', function(done) {
    allocUtil.allocLoop( "hyperty", 100, 3, done);
  });

  it('100 hyperty address de-allocation requests for 3 addresses each ', function(done) {
    allocUtil.deallocLoop( "hyperty", done);
  });

  it('100 hyperty address allocation requests for 3 addresses each with allocationKey', function(done) {
    allocUtil.allocLoop( "hyperty", 100, 3, done, true);
  });

  it('100 hyperty address de-allocation requests for 3 addresses each with allocationKey', function(done) {
    allocUtil.deallocLoop( "hyperty", done, true);
  });

  /********** 1000 iterations ********************/

  it('1000 hyperty address allocation requests for 1 address each ', function(done) {
    allocUtil.allocLoop( "hyperty", 1000, 1, done);
  });

  it('1000 hyperty address de-allocation requests for 1 address each ', function(done) {
    allocUtil.deallocLoop( "hyperty", done);
  });

  it('1000 hyperty address allocation requests for 3 addresses each ', function(done) {
    allocUtil.allocLoop( "hyperty", 1000, 3, done);
  });

  it('1000 hyperty address de-allocation requests for 3 addresses each ', function(done) {
    allocUtil.deallocLoop( "hyperty", done);
  });

  it('1000 hyperty address allocation requests for 3 addresses each with allocationKey', function(done) {
    allocUtil.allocLoop( "hyperty", 1000, 3, done, true);
  });

  it('1000 hyperty address de-allocation requests for 3 addresses each with allocationKey', function(done) {
    allocUtil.deallocLoop( "hyperty", done, true);
  });


  /********** 10000 iterations ********************/

  it('10000 hyperty address allocation requests for 1 address each ', function(done) {
    allocUtil.allocLoop( "hyperty", 10000, 1, done);
  });

  it('10000 hyperty address de-allocation requests for 1 address each ', function(done) {
    allocUtil.deallocLoop( "hyperty", done);
  });

  it('10000 hyperty address allocation requests for 3 addresses each ', function(done) {
    allocUtil.allocLoop( "hyperty", 10000, 3, done);
  });

  it('10000 hyperty address de-allocation requests for 3 addresses each ', function(done) {
    allocUtil.deallocLoop( "hyperty", done);
  });

  it('10000 hyperty address allocation requests for 3 addresses each with allocationKey', function(done) {
    allocUtil.allocLoop( "hyperty", 10000, 3, done, true);
  });

  it('10000 hyperty address de-allocation requests for 3 addresses each with allocationKey', function(done) {
    allocUtil.deallocLoop( "hyperty", done, true);
  });

  it('cleanup: disconnect stub', function(done) {
    allocUtil.prepare(done);
  });

});
