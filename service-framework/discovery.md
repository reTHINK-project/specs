---
layout: documentation
title: Discovery API
category: APIs
order: 3
---


*[source code](https://github.com/reTHINK-project/dev-service-framework/blob/master/src/message-factory/MessageFactory.js)*

Hyperty discovery is performed through the Runtime Core Discovery component which is used to query about Hyperty instances and Data Objects according to different criteria including UserId, supported Scheme, Hyperty Resources and name.

The discovery results are returned as a DiscoveryObject that provides event handlers for registration status changes (`onLive` and `onDisconnected`).


The detailed description of how discovery works is provided [here](../dynamic-view/discovery/hyperty-discovery.md).

Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-service-framework/class/src/discovery/Discovery.js~Discovery.html).

## Discovery

This is the main class that allows Hyperties to discover other Hyperties or Data Objects using different discovery criteria.

### Properties

* messageBus: MiniBus interface to send and receive message, using postMessage and addListener

* runtimeURL: the Runtime URL

* domain: the runtime domain

* discoveryURL: the URL of the Hyperty that is using this discovery library. It will be used to set the `from` header field of discovery message requests.

### Methods

**constructor**

`constructor(hypertyURL: HypertyURL, runtimeURL: RuntimeURL, msgBus: MiniBus)`

* hypertyURL: the URL of the Hyperty that is using this discovery library.

* runtimeURL: the Runtime URL where the Hyperty is executing

* msgBus: MiniBus interface to send and receive message, using postMessage and addListener


**discoverHypertiesPerUserProfileDataDO**

This function allows to discover Hyperty instances running for a certain user.

`discoverHypertiesPerUserProfileDataDO(userIdentifier: string, scheme: string, resources: [string])`

* userIdentifier: the identitier of the user eg email

* scheme: the Data Object URL scheme supported by the Hyperty to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

 *  resources: list of types of Hyperty Resources supported by the Hyperty to be discovered including `chat`, `file`, `audio` and / or `video`

 *to be completed*
