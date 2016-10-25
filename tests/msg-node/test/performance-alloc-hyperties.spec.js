import expect from 'expect.js';
import AllocUtil from './performance-alloc-common.js';


describe('Hyperty address allocation performance for different numbers of addresses', function() {
  this.timeout(100000);

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
