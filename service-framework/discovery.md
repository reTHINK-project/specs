---
layout: documentation
title: Discovery API
category: APIs
order: 3
---


*[source code](https://github.com/reTHINK-project/dev-service-framework/tree/master/src/discovery)*

Hyperty discovery is performed through the Runtime Core Discovery component which is used to query about Hyperty instances and Data Objects according to different criteria including UserId, supported Scheme, Hyperty Resources and name.

The discovery results are returned as a DiscoveredObject that provides event handlers for registration status changes (`onLive` and `onDisconnected`).


The detailed description of how discovery works is provided [here](../dynamic-view/discovery/hyperty-discovery.md).

Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-service-framework/class/src/discovery/Discovery.js~Discovery.html).

# Discovery Interface

This is the main class that allows Hyperties to discover other Hyperties or Data Objects using different discovery criteria.

## Properties

**messageBus:** MiniBus interface to send and receive message, using postMessage and addListener

**runtimeURL:** the Runtime URL

**domain:** the runtime domain

**discoveryURL:** the URL of the Hyperty that is using this discovery library. It will be used to set the `from` header field of discovery message requests.

## constructor

`constructor(hypertyURL: HypertyURL, runtimeURL: RuntimeURL, msgBus: MiniBus)`

**hypertyURL:** the URL of the Hyperty that is using the discovery library.

**runtimeURL:** the Runtime URL where the Hyperty is executing

**msgBus:** MiniBus interface to send and receive message, using postMessage and addListener

## Hyperties Discovery

### discover Hyperties Per User Identifier for a certain domain

This function allows to discover Hyperty instances running for a certain user in a specific Domain.

`discoverHypertiesDO(user: string, scheme: [string], resources: [string], domain?: string): Promise [<DiscoveredObject>]`

**user:** the identitier of the user eg email

**scheme:** list of types of Data Object URL scheme supported by the Hyperty to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Hyperty to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the hyperty to be discovered is registered.

**return:** Promise to an Array of DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to discover the Hyperties of the user with the email xpto@gmail.com and related with chat scheme
  discovery.discoverHypertiesDO("user://google.com/xpto@gmail.com", ["comm"], ["chat"], "example.com").then(function(discoveredObjects) {
   let hyperties; 
   discoveredObjects.map(function(object) {
    hyperties.push(object.data);
   });
   console.log("Discovered Hyperties: ", hyperties);
  }
  </code>
</pre>

### discover Hyperty Per URL

This function allows to discover a specific Hyperty instance given its Hyperty URL.

`discoverHypertyPerURLDO(url: HypertyURL, domain?: string): Promise <DiscoveredObject>`

**url:** Hyperty URL to be discovered

**domain (optional):** the domain name where the hyperty to be discovered is registered.

**return:** Promise to a DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to discover the Hyperty with a specific URL
  discovery.discoverHypertyPerURLDO("hyperty://example.com/486ee3b3-002c-4d2d-a9e8-e2f7f9db58ac", "example.com").then(function(discoveredObject) {
   let hyperty = discoveredObject.data; 
   console.log("Discovered Hyperty: ", hyperty);
  }
  </code>
</pre>

## Data Objects Discovery

### discover Data Objects Per User Identifier for a certain domain

This function allows to discover Data Object instances running for a certain user in a specific Domain.

`discoverDataObjectsDO(user: string, scheme: [string], resources: [string], domain?: string): Promise [<DiscoveredObject>]`

**user:** the identitier of the user eg email

**scheme:** list of types of Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to discover the Data Objects with Reporter Hyperties associated with the user email xpto@gmail.com and related with the chat scheme
  discovery.discoverDataObjectsDO("user://google.com/xpto@gmail.com", ["comm"], ["chat"], "example.com").then(function(discoveredObjects) {
   let dataObjects; 
   discoveredObjects.map(function(object) {
    dataObjects.push(object.data);
   });
   console.log("Discovered Data Objects: ", dataObjects);
  }
  </code>
</pre>

### discover Data Object Per URL

This function allows to discover a specific Data Object instance given its URL.

`discoverDataObjectPerURLDO(url: URL, domain?: string): Promise <DiscoveredObject>`

**url:** Data Object URL to be discovered

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to a DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to discover the Data Object with a specific URL
  discovery.discoverDataObjectPerURLDO("comm://example.com/38d63a5b-99ce-4e1b-bf4e-4f5ec1d27e76", "example.com").then(function(discoveredObject) {
   let dataObject = discoveredObject.data; 
   console.log("Discovered Data Object: ", dataObject);
  }
  </code>
</pre>

### discover Data Object Per Name

This function allows to discover Data Object instances given its name in a specific Domain.

`discoverDataObjectsPerNameDO(name: string, scheme: [string], resources: [string], domain?: string): Promise [<DiscoveredObject>]`

**name:** the name of the Data Object to be discovered

**scheme:** list of types of Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to discover the Data Objects with a specific name and related with chat scheme
  discovery.discoverDataObjectsPerNameDO("example", ["comm"], ["chat"], "example.com").then(function(discoveredObjects) {
   let dataObjects; 
   discoveredObjects.map(function(object) {
    dataObjects.push(object.data);
   });
   console.log("Discovered Data Objects: ", dataObjects);
  }
  </code>
</pre>

### discover Data Object Per Reporter

This function allows to discover Data Object instances given its Reporter Hyperty URL, in a specific Domain.

`discoverDataObjectsPerReporterDO(reporter: HypertyURL, scheme: [string], resources: [string], domain?: string): Promise [<DiscoveredObject>]`

**reporter:** the Reporter Hyperty URL of the Data Object to be discovered

**scheme:** list of types of Data Object URL scheme used by the Data Object to be discovered including `connection` for webrtc connections, `comm` for chat and file sharing, and `context` for user context including User Availability (presence).

**resources:** list of types of Hyperty Resources supported by the Data Object to be discovered including `chat`, `file`, `audio` and / or `video`

**domain (optional):** the domain name where the Data Object to be discovered is registered.

**return:** Promise to an Array of DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to discover the Data Objects with Reporter Hyperties with a specific URL and related with the chat scheme
  discovery.discoverDataObjectsPerReporterDO("hyperty://example.com/486ee3b3-002c-4d2d-a9e8-e2f7f9db58ac", ["comm"], ["chat"], "example.com").then(function(discoveredObjects) {
   let dataObjects; 
   discoveredObjects.map(function(object) {
    dataObjects.push(object.data);
   });
   console.log("Discovered Data Objects: ", dataObjects);
  }
  </code>
</pre>

## Discoveries Resume

This function allows to retrieve all DiscoveredObjects created in past sessions with active notifications for registration status (see below the DiscoveredObject doc for more info)

`resumeDiscoveries(): Promise [<DiscoveredObject>]`

**return:** Promise to an Array of DiscoveredObject.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user wants to resume his previous discoveries from the subscriptions made
  discovery.resumeDiscoveries().then(function(discoveredObjects) {
   let objects; 
   discoveredObjects.map(function(object) {
    objects.push(object.data);
   });
   console.log("Discovered Objects (Hyperties or Data Objects): ", objects);
  }
  </code>
</pre>

# DiscoveredObject Interface

This is the class implemented by the Objects returned by the Discovery functions described above. It contains all data retrieved from the Registry as well as functions to enable and disable notifications about the registration status of the DiscoveredObject.

## Properties

**data:** contains all data retrieved from the Registry as defined by the [Registry Data Model](../datamodel/core/hyperty-registry/readme.md)

## constructor

`constructor(data: RegistryDataObject, runtimeURL: RuntimeURL, discoveryURL: HypertyURL, msgBus: MiniBus)`

**data:** contains all data retrieved from the Registry as defined by the [Registry Data Model](../datamodel/core/hyperty-registry/readme.md)

**discoveryURL:** the URL of the Hyperty that is using the discovery library.

**runtimeURL:** the Runtime URL where the Hyperty is executing

**msgBus:** MiniBus interface to send and receive message, using postMessage and addListener

## Subscribe to be notified when DiscoveredObject is `live`

This function allows to subscribe for notifications about when the DiscoveredObject registration status is changed to `live`, i.e. when such notification is received it means the Hyperty instance or the Data Object instance associated with this DiscoveredObject is running again.

`onLive(subscriber: HypertyURL, callback: function() ): Promise`

**subscriber:** the URL of the Hyperty subscribing for this notification

**callback:** callback function to receive the notification.

**return:** Promise with void.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user uses the discoverHypertyPerURLDO function to discover the Hyperty with a specific URL and then subscribe to receive the onLive events
  discovery.discoverHypertyPerURLDO("hyperty://example.com/486ee3b3-002c-4d2d-a9e8-e2f7f9db58ac", "example.com").then(function(discoveredObject) {
   discoveredObject.onLive(_this._myUrl,()=>{
    console.log("[Notification] disconnected Hyperty is back to live: ", discoveredObject.data);
   });
  }
  </code>
</pre>

## Subscribe to be notified when DiscoveredObject is `disconnected`

This function allows to subscribe for notifications about when the DiscoveredObject registration status is changed to `disconnected`, i.e. when such notification is received it means the Hyperty instance or the Data Object instance associated with this DiscoveredObject is not running anymore.

`onDisconnected(subscriber: HypertyURL, callback: function() ): Promise`

**subscriber:** the URL of the Hyperty subscribing for this notification

**callback:** callback function to receive the notification.

**return:** Promise with void.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
    // Example: user uses the discoverHypertyPerURLDO function to discover the Hyperty with a specific URL and then subscribe to receive the onDisconnected events
  discovery.discoverHypertyPerURLDO("hyperty://example.com/486ee3b3-002c-4d2d-a9e8-e2f7f9db58ac", "example.com").then(function(discoveredObject) {
   discoveredObject.onDisconnected(_this._myUrl,()=>{
    console.log("[Notification] Hyperty was disconnected: ", discoveredObject.data);
   });
  }
  </code>
</pre>

## Unsubscribe for `live` registration status notifications

This function allows to unsubscribe for notifications about when the DiscoveredObject registration status is changed to `live`, i.e. Hyperty stops receiving notifications about when the Hyperty instance or the Data Object instance associated with this DiscoveredObject is running again.

`unsubscribeLive(subscriber: HypertyURL ): Promise`

**subscriber:** the URL of the Hyperty that is unsubscribing for this notification

**callback:** callback function to receive the notification.

**return:** Promise with void.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
    // Example: user uses the discoverHypertyPerURLDO function to discover the Hyperty with a specific URL and to subscribe to receive the onLive events. After receiving the notification, the subscription is canceled
  discovery.discoverHypertyPerURLDO("hyperty://example.com/486ee3b3-002c-4d2d-a9e8-e2f7f9db58ac", "example.com").then(function(discoveredObject) {
   discoveredObject.onLive(_this._myUrl,()=>{
    console.log("[Notification] disconnected Hyperty is back to live: ", discoveredObject.data);
    // unsubscribe function
    discoveredObject.unsubscribeLive(_this._url);
   });
  }
  </code>
</pre>

## Unsubscribe for `disconnected` registration status notifications

This function allows to unsubscribe for notifications about when the DiscoveredObject registration status is changed to `disconnected`, i.e. Hyperty stops receiving notifications about when the Hyperty instance or the Data Object instance associated with this DiscoveredObject is not running anymore.

`unsubscribeDisconnected(subscriber: HypertyURL ): Promise`

**subscriber:** the URL of the Hyperty that is unsubscribing for this notification

**callback:** callback function to receive the notification.

**return:** Promise with void.

**How to use it**

<pre class="line-numbers">
  <code class="language-javascript">
  // Example: user uses the discoverHypertyPerURLDO function to discover the Hyperty with a specific URL and to subscribe to receive the onDisconnected events. After receiving the notification, the subscription is canceled
  discovery.discoverHypertyPerURLDO("hyperty://example.com/486ee3b3-002c-4d2d-a9e8-e2f7f9db58ac", "example.com").then(function(discoveredObject) {
   discoveredObject.onDisconnected(_this._myUrl,()=>{
    console.log("[Notification] Hyperty was disconnected: ", discoveredObject.data);
    // unsubscribe function
    discoveredObject.unsubscribeDisconnected(_this._url);
   });
  }
  </code>
</pre>

