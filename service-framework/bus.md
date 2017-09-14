---
layout: documentation
title: Bus API
category: APIs
order: 1
---

The Bus API provides a simple API to send and receive messages in a loosely coupled manner between framework component including Hyperty Instances and Protocol Stubs:

`postMessage(inMsg, responseCallback)` that is used to post messages in order to communicate with registered listeners.

`addListener(url, listener)` that is used to register a listener to receive message when `msg.to === url`.

Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-runtime-core/class/src/bus/Bus.js~Bus.html)
