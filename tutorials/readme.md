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

Developers can use Hyperties in Applications by using any framework or tool by just performing a few steps:

1- import the following script in your HTML:

<pre class="line-numbers">
  <code class="language-markup">
    &lt;script src="https://hybroker.rethink.ptinovacao.pt/.well-known/runtime/rethink.js">&lt;/script>
  </code>
</pre>

2- Add these lines in your javascript to instantiate the Hypert Runtime

<pre class="line-numbers">
  <code class="language-javascript">
    let config = {
      "development": true,
      "runtimeURL": "hyperty-catalogue://hybroker.rethink.ptinovacao.pt/.well-known/runtime/Runtime",
      "domain": "hybroker.rethink.ptinovacao.pt"
    }

    let runtime;
    let hypertyCatalogueURL = 'hyperty-catalogue://'+config.domain + '/.well-known/hyperty/HelloWorldReporter';

    rethink.default.install(config).then(function(result) {

      runtime = result;

      deployHyperty();

    }).catch(function(reason) {
      console.error(reason);
    });
  </code>
</pre>

3- then load and deploy the HelloWorldReporter Hyperty from the Catalogue

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

4- and invoke Hyperty functions from its API as a common Javascript Lib:

<pre class="line-numbers">
  <code class="language-javascript">
  function startUsingDeployedHperty(hyperty){
    hyperty.instance.hello(observer).then( function(hello) {
      console.log('[SimpleHelloWorld.hello] ', hello);
      });
  }
  </code>
</pre>

5- to test, open in anonymous mode, another browser to run the [HelloWorldObserver Hyperty](https://rethink-project.github.io/dev-hyperty/demos/hello-world-observer/), copy its address:

![Hello World Observer Hyperty Address](../../img/tutorials/helloWorldDemo1.png)

... and set it in your `observer` javascript variable:

<pre class="line-numbers">
  <code class="language-javascript">
    let observer = 'hyperty://hybroker.rethink.ptinovacao.pt/2b6dbcc1-a623-484c-b87e-5ce86ea0b9d3';
  </code>
</pre>

Run your App and you should see `Hello` and `Bye` messages in the HelloWorldObserver page, something like this:

![Messages received by Hello World Observer Hyperty ](../../img/tutorials/helloWorldDemo2.png)

You may see the complete source code [here](https://github.com/reTHINK-project/dev-hyperty/tree/master/docs/demos/hello-world-reporter).

Do you want more? then ..

* play with available Hyperties that are in the [Hyperty Catalogue](../../../dev-hyperty).

* develop your own Hyperty in a few steps as explained [here](../development-of-hyperties).
