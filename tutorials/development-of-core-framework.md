---
layout: documentation
title: reTHINK Core Framework implementation
category: Getting Started
order: 9
---

The reTHINK Core Framework is fully open sourced (Apache 2.0) and hosted in different Github repositories where you can find all information about how to get involved in the Core Framework development.

## Front-end Components

--	The [Runtime Core Repository](https://github.com/reTHINK-project/dev-runtime-core) contains the source code required to support the deployment and execution of Hyperties in user devices or in network servers. Hyperty Core Runtime components are platform agnostic and are to be included in platform specific Hyperty Runtimes, like Web Browsers and Nodejs based platforms.

--	the [Runtime for Browser repo](https://github.com/reTHINK-project/dev-runtime-browser) contains the code necessary to execute the reTHINK runtime core in a browser.

--	the [Runtime for NodeJS repo](https://github.com/reTHINK-project/dev-runtime-nodejs) contains the code necessary to execute the reTHINK runtime core in NodeJS server.

--	the [Service Framework repo](https://github.com/reTHINK-project/dev-service-framework) contains the source code of libraries that are used to facilitate the development of Hyperties and Protostubs.



## Toolkit

the [Toolkit repository](https://github.com/reTHINK-project/dev-hyperty-toolkit)  provides tools to develop and test Hyperties, Protostubs and IdP Proxies.

## back-end Components

The reTHINK Core Framework is comprised by three main back-end components: Message Node, Registry and Catalogue.

### Message Node

The Message Node provides real time message oriented communication functionalities used by Hyperties to communicate (Message Routing). There are three implementations of the Message Node:


--	the [Message Node based on Vertx.io Java ](https://github.com/reTHINK-project/dev-msg-node-vertx)

-- the [NoMatrix Message Node Source (JavaScript)](https://github.com/reTHINK-project/dev-msg-node-nomatrix)

--	[Message Node based on NodeJS (Javascript)](https://github.com/reTHINK-project/dev-msg-node-nodejs)

## Domain Registry

The [Domain Registry repo](https://github.com/reTHINK-project/dev-registry-domain) contains the source code for Registry Support Service where Hyperty instances and associated End-users are registered and discoverable.

## Catalogue

The [ReTHINK Catalogue](https://github.com/reTHINK-project/dev-catalogue) contains the documentation and implementation of the reTHINK Catalogue Broker, Database, and Test Website. The Catalogue Support Service provides access to Hyperty assets including service descriptions, software services, policy, documentation, and other assets or artifacts that are essential to the operation of the service.
