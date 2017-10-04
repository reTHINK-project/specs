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

# Discovery Interface

This is the main class that allows Hyperties to discover other Hyperties or Data Objects using different discovery criteria.

## Properties

* messageBus: MiniBus interface to send and receive message, using postMessage and addListener

* runtimeURL: the Runtime URL

* domain: the runtime domain

* discoveryURL: the URL of the Hyperty that is using this discovery library. It will be used to set the `from` header field of discovery message requests.

## constructor

`constructor(hypertyURL: HypertyURL, runtimeURL: RuntimeURL, msgBus: MiniBus)`

* hypertyURL: the URL of the Hyperty that is using the discovery library.

* runtimeURL: the Runtime URL where the Hyperty is executing

* msgBus: MiniBus interface to send and receive message, using postMessage and addListener

## Hyperties Discovery

### discover Hyperties Per User Identifier for a certain domain

This function allows to discover Hyperty instances running for a certain user in a specific Domain.

`discoverHypertiesDO(user: string, scheme: string, resources: [string], domain?: string): Promise [<DiscoveryObject>]`

**user:** the identitier of the user eg email

**scheme:** the Data Object URL scheme supported by the Hyperty to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Hyperty to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the hyperty to be discovered is registered.

**return:** Promise to an Array of DiscoveryObject.

### discover Hyperty Per URL

This function allows to discover a specific Hyperty instance given its Hyperty URL.

`discoverHypertyPerURLDO(url: HypertyURL, domain?: string): Promise <DiscoveryObject>`

**url:** Hyperty URL to be discovered

**domain (optional):** the domain name where the hyperty to be discovered is registered.

**return:** Promise to a DiscoveryObject.

## Data Objects Discovery

### discover Data Objects Per User Identifier for a certain domain

This function allows to discover Data Object instances running for a certain user in a specific Domain.

`discoverDataObjectsDO(user: string, scheme: string, resources: [string], domain?: string): Promise [<DiscoveryObject>]`

**user:** the identitier of the user eg email

**scheme:** the Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveryObject.

### discover Data Object Per URL

This function allows to discover a specific Data Object instance given its URL.

`discoverDataObjectPerURLDO(url: URL, domain?: string): Promise <DiscoveryObject>`

**url:** Data Object URL to be discovered

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to a DiscoveryObject.

### discover Data Object Per Name

This function allows to discover Data Object instances given its name in a specific Domain.

`discoverDataObjectsPerNameDO(name: string, scheme: string, resources: [string], domain?: string): Promise [<DiscoveryObject>]`

**name:** the name of the Data Object to be discovered

**scheme:** the Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveryObject.

### discover Data Object Per Reporter

This function allows to discover Data Object instances given its Reporter Hyperty URL, in a specific Domain.

`discoverDataObjectsPerReporterDO(reporter: HypertyURL, scheme: string, resources: [string], domain?: string): Promise [<DiscoveryObject>]`

**reporter:** the Reporter Hyperty URL of the Data Object to be discovered

**scheme:** the Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveryObject.

## Discoveries Resume

This function allows to retrieve all DiscoveryObjects created in past sessions with active notifications for registration status (see below the DiscoveryObject doc for more info)

`resumeDiscoveries(): Promise [<DiscoveryObject>]`

**reporter:** the Reporter Hyperty URL of the Data Object to be discovered

**scheme:** the Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveryObject.


 *to be completed*
