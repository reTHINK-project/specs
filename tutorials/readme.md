---
layout: documentation
title: Quickstart
category: Getting Started
order: 0
---

The reTHINK framework is an implementation of the
**Decentralized Communications** concept providing trustworthy communication among any peers without central authorities or communication monopolies.

It introduces a new service paradigm - Hyperties - to facilitate the development of complex decentralized Web Applications according to Microservices architectural patterns.

Hyperties are inherently inter-operable without the need to standardize protocols or service APIs.
Required Protocols are dynamically loaded and P2P data synchronisation streams are established between Hyperties by using the Reporter - Observer communication pattern.

Developers can use Hyperties in Applications by using any Web framework with a few lines of code. Let's see how the Hello World Reporter Hyperty is able to invite a remote Hello World Observer Hyperty and say "Hello" to it.

1: let's first get the address from the remote Observer Hyperty. In anonymous mode, open a new browser windows to run the [HelloWorldObserver Hyperty](https://rethink-project.github.io/dev-hyperty/demos/hello-world-observer/), and take note of its address:

![Hello World Observer Hyperty Address](../../img/tutorials/helloWorldDemo1.png)

2- import the following script in your HTML:

<pre class="line-numbers">
  <code class="language-markup">
    &lt;script src="https://hybroker.rethink.ptinovacao.pt/.well-known/runtime/rethink.js">&lt;/script>
  </code>
</pre>

3- Add these lines in your javascript to instantiate the Hypert Runtime

<pre class="line-numbers">
  <code class="language-javascript">
    let config = {
      "development": true,
      "runtimeURL": "hyperty-catalogue://hybroker.rethink.ptinovacao.pt/.well-known/runtime/Runtime",
      "domain": "hybroker.rethink.ptinovacao.pt"
    }

    let runtime;
    let hypertyCatalogueURL = 'hyperty-catalogue://'+config.domain + '/.well-known/hyperty/HelloWorldReporter';

    let observer ='hyperty://hybroker.rethink.ptinovacao.pt/d35a4bce-e281-4125-8536-a6daa24ea9ce'; // Address from the Observer Hyperty

    rethink.default.install(config).then(function(result) {

      runtime = result;

      deployHyperty();

    }).catch(function(reason) {
      console.error(reason);
    });
  </code>
</pre>

**Note that the `observer` variable was set with the address from the Hello World Observer Hyperty that is running in the anonymous window.**

4- then load and deploy the HelloWorldReporter Hyperty from the Catalogue

<pre class="line-numbers">
  <code class="language-javascript">
    function deployHyperty(){
      runtime.requireHyperty(hypertyCatalogueURL).then( function(hyperty) {
          startUsingDeployedHperty(hyperty);
        }).catch(function(reason) {
        errorMessage(reason);
      });
    }
  </code>
</pre>

5- and invoke Hyperty functions from its API as a common Javascript Lib:

<pre class="line-numbers">
  <code class="language-javascript">
  function startUsingDeployedHperty(hyperty){
    hyperty.instance.hello(observer).then( function(hello) {
      helloObj = hello;
      console.log('[SimpleHelloWorld.hello] ', helloObj.data);
      });
    }
  </code>
</pre>

6- Run your App and you should see the `Hello` messages in the HelloWorldObserver page, something like this:

![Messages received by Hello World Observer Hyperty ](../../img/tutorials/helloWorldDemo2.png)



7- In the browser console, if you look for the `[SimpleHelloWorld.hello]` log, you will see the contents of the Hello Data Object that is now synchronised between the Hello World Reporter Hyperty and the Hello World Observer Hyperty. For example, if you call the `bye()` function, the Hello Data Object is changed and immediately propagated to the Hello World Observer Hyperty. Change your `startUsingDeployedHperty` like this:

<pre class="line-numbers">
  <code class="language-javascript">
    function startUsingDeployedHperty(hyperty){
      hyperty.instance.hello(observer).then( function(hello) {
        helloObj = hello;
        console.log('[SimpleHelloWorld.hello] ', helloObj.data);
        setTimeout(function(){ sayBye(hyperty);}, 3000);
        });
      }
  </code>
</pre>

*Note: the setTimout is used to give time to setup the sync data stream between the Reporter and the Observer. In more complete Hyperties, a listener should be set to handle events about data sync stream setup status.*

... add a new `sayBye` function:

<pre class="line-numbers">
  <code class="language-javascript">
    function sayBye(hyperty){
      hyperty.instance.bye();
      console.log('[SimpleHelloWorld.sayBye] ', helloObj.data);
      }
  </code>
</pre>


... and run again your App. Now you should also see a "bye bye" message on the remote Observer Hyperty.

8- Since the Hello World Observer is now synchronised with the Hello data object, the App itself can change it. Lets add another function, `sayHelloAgain`, to do that:

<pre class="line-numbers">
  <code class="language-javascript">
    function sayBye(hyperty){
      hyperty.instance.bye();
      console.log('[SimpleHelloWorld.sayBye] ', helloObj.data);
      setTimeout(function(){ sayHelloAgain();}, 3000);
    }

    function sayHelloAgain(){
      helloObj.data.hello = 'Hello Again :)';
      console.log('[SimpleHelloWorld.sayHelloAgain] ', helloObj.data);
    }
  </code>
</pre>

... run your App again and you should see a new "Hello Again" message on the remote Observer Hyperty and ... :fireworks: :rocket:  Cool? :stuck_out_tongue_winking_eye:


Check the complete source code [here](https://github.com/reTHINK-project/dev-hyperty/tree/master/docs/demos/hello-world-reporter).

------------

Next steps:

 * play with available Hyperties that are in the [Hyperty Catalogue](../../../dev-hyperty).

 * develop your own Hyperty in a few steps as explained [here](../development-of-hyperties).
