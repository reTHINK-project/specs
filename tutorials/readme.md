---
layout: documentation
title: Quickstart
category: Getting Started
order: 0
---

<h1></h1>
<h1></h1>

The reTHINK framework is an implementation of the
**Decentralized Communications** concept providing trustworthy communication among any peers without central authorities or communication monopolies.

It introduces a new service paradigm - Hyperties - to facilitate the development of complex decentralized Web Applications according to Microservices architectural patterns.

## Security: sandboxes

The Web developer does not have to deal with low level details of the architecture. The sandboxes and the management of hyperties and protostubs is done by the core framework. The sandboxes allows to isolate code from different providers reducing the risk of suffering cross-site scripting attacks.

## Interoperability: Protostubs

In a standard Web Application, developers need to know in advance with which services providers it will be necessary to interact. The number of protocols an application can speak is limited in implementation time and it can not change without modifying the code. In reTHINK the protocol-on-the-fly concept is used. If you need to interact with a service which uses protocol A, the framework will provide you on-the-fly a piece of code called protostub which will be executed in the right sandbox. This protostub will speak protocol A and it will expose a common API to the Hyperty Core Runtime. The Web Developer will not need to deal with this complexity.   

## Identity management.

The identity management is normally coupled to the service logic and there are many different standard protocols for authentication and Identity management that makes it harder to achieve interoperability between different services. The reTHINK framework decouples the service logic from the Identity Management logic and provides a common Identity Management API that is agnostic of protocols used. The protocol-on-the-fly mechanism is also used to provide you on-the-fly the right protostub (here called IDP Proxy) to interact with each Identity Provider selected by the end-user.

## How to use Hyperties in Web Applications

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

:fireworks: :rocket:  Cool? :stuck_out_tongue_winking_eye:


7- let's go a bit further. In the browser console, if you look for the `[SimpleHelloWorld.hello]` log, you will see the contents of the Hello Data Object that is now synchronised between the Hello World Reporter Hyperty and the Hello World Observer Hyperty. For example, if you call the `bye()` function, the Hello Data Object is changed and immediately propagated to the Hello World Observer Hyperty. Let's try. Change your `startUsingDeployedHperty` like this:

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


... and run again your App. Now you should also see a "bye bye" message on the remote Observer Hyperty ... :fireworks: :rocket:  Cool? :stuck_out_tongue_winking_eye:


8- The App itself can directly change the Hello data object. Lets add another function, `sayHelloAgain`, to do that:

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


## Next steps:

 - play with available Hyperties that are in the [Hyperty Catalogue](../../../dev-hyperty).

 - develop your own Hyperty in a few steps as explained [here](../development-of-hyperties).
