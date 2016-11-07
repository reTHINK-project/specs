## Syncher

The Syncher API provides data object synchronisation among Hyperties as described by the [Reporter-Observer communication pattern](https://github.com/reTHINK-project/dev-hyperty-toolkit/blob/master/docs/tutorials/p2p-data-sync.md).

The synchronised Data Objects are JSON data objects that are compliant with [SyncDataObject JSON Schema](../../../schemas/json-schema/data-objects/SyncDataObject.json).

The Syncher API is depicted in the following diagram:

![Syncher API](SyncherAPI.png)

The Syncher is a singleton owned by a Hyperty Instance that uses it to communicate with other Hyperty instance through data synchronisation. The Syncher "owns" all DataObjects (DataObject class) used by its Hyperty Instance i.e. DataObject instances (creation, destruction) are managed by the Syncher and not by the Hyperty Instance. Each DataObject is addressed by a URL - ObjectURL - that is used by the [Hyperty Messaging Framework](https://github.com/reTHINK-project/dev-hyperty-toolkit/blob/master/docs/tutorials/hyperty-messaging-framework.md) to correctly route messages required to support the data synchronisation, via the MiniBUS component. When a new Data Object (Reporter or Observed) is created, the Syncher will add listeners in the MiniBus to receive messages targeting the ObjectURL. This means, the Syncher is the end-point associated to ObjectURL and not the Hyperty Instance.

According to the Reporter-Observer pattern, there are two types of DataObjects that each Syncher can manage:

DataObjectReporter - provides functions to handle DataObjects as a Reporter i.e. the data that is written in the object by the DataObject owner, is immediately propagated to all observers. It also handles requests from other Hyperty instance to subscribe (ie request to be an Observer) or to read the Data Object.

DataObjectObserver - provides functions to handle DataObjects as a Observer i.e. it handles a "copy" of the original Data Object which is updated as soon as the Reporter changes. Changes on the DataObject are notified to the Hyperty Instance Observers.

In addition, DataObjects can be SyncObjectParents with collections of DataObjectChild. Each collection is called DataObjectChildren. Either Reporter (DataObjectReporter) or Observers (DataObjectObserver) can create DataObjectChilds in a certain children collection (`addChild()` function).

*todo: add code snippets for each main function*

### Syncher API

This is the main class that manages the creation of Data Objects. It is a singleton i.e. only one instance is available per Hyperty instance. It's the owner of all kind of [Data Objects](../../datamodel/data-objects/data-synch) that can be synchronised by the Syncher including Reported Objects (DataObjectReporter) and Observed Objects (DataObjectObserver).

##### Properties
* owner: HypertyURL of Syncher's Hyperty instance owner
* observers: [DataObjectObserver] Array of Observed Objects
* reporters: [DataObjectReporter] Array of Reported Objects

##### Methods

**constructor**

`constructor(owner: HypertyURL, bus: MiniBus, config: Config)`

Syncher is created one per Hyperty. The parameters are basically the same as the ones that are passed to the Hyperty constructor.

* owner: HypertyURL of Syncher's Hyperty instance owner
* bus: MiniBus interface to send and receive message, using postMessage and addListener
* config: Configuration data. The only required field for now is the runtimeURL

**create**

`create(schema: SchemaURL, observers?: [HypertyURL], initialData: JSON): Promise<DataObjectReporter>`

This Method is used to create objects to be reported i.e. the Hyperty Instance plays the Reporter role. The following parameters are used:

* schema: Hyperty Catalogue URL address that can be used to retrieve the JSON-Schema describing the Data Object schema
* observers: array of Hyperty instances that are invited to be an observer of the new Data Object
* initialData: data that is used to initialise the new Data Object
* return: Promise to a new Reporter. The reporter can be accepted or rejected by the PEP

**subscribe**

`subscribe(schema: SchemaURL, url: ObjectURL): Promise<DataObjectObserver>`

This Method is used to subscribe objects to be observed i.e. the Hyperty Instance plays the Observer role. The following parameters are used:

* schema: Hyperty Catalogue URL address that can be used to retrieve the JSON-Schema describing the Data Object schema
* url: the URL of the Data Object to be observed
* return: Promise to a new observer if accepted. It's associated with the reporter.

**read**

`read(url: ObjectURL): Promise<JSON>`

This Method is used to read an existing object i.e. the Hyperty Instance does not play the Observer role nor the Reporter role. The following parameters are used:

* url: the URL of the Data Object to be read
* return: Promise to last available data of the reporter

##### Event Handlers

**onNotification**

`onNotification(callback: (event: CreateEvent | DeleteEvent) => void): void`

Receive create invitations or delete notifications from Reporter objects. Hyperties should listen and respond accordingly, using the event methods. Invitations are sent with `Syncher.create(..)`` or `DataObjectReporter.inviteObservers(..)``

* callback: callback function to receive create and delete events.

### DataObject
Top implementation of Data Object Reporters and Observers with common properties, methods and handlers.

##### Properties
* url: ObjectURL address for this instance.
* data: JSON data syncronized with the associated remote Reporter or Observer
* schema: SchemaURL address, for the JSON Schema
* childrens: All created childrens since the subscription, doesn't contain all childrens since reporter creation.

##### Methods

**addChild**


`addChild(children: string, initialData: JSON): Promise<DataObjectChild>`

Create and add a DataObjectChild to a children collection.

* children: children name where the child is added.
* initialData: Initial data of the child
* return: Promise to a new DataObjectChild.

##### Event Handlers

**onAddChild**

`onAddChild(callback: (event: CreateEvent) => void): void`

Setup the callback to process create and delete of remote DataObjectChild. Remote DataObjectChilds are any created child from an associated Reporter or Observer.

* callback: callback function to receive child create and delete events.

### DataObjectReporter
Read/Write reporter object. Syncronization is shared with other observers.

##### Properties
* (inherited) status: on | paused | waiting
* subscriptions: [SyncSubscription] array of subscriptions, Hyperties that are listening this object

In addition to the inherited properties, it has a registry of all remote observers subscriptions. Since all subscriptions are instances of SyncSubscription, it's possible to read the status of the subscription and act on it (pause, resume, stop). For example, in a chat room it will be possible to kick out someone executing the stop().

##### Methods

**inviteObservers**

`inviteObservers(observers: [HypertyURL])`

Send invitations (create messages) to hyperties, observers list. Invitations do not associate a Reporter/Observer. An explicit subscription must be sent from the Observer.

* observers: array of hyperties to invite

##### Event Handlers

In addition to the inherited handlers, the reporter can listen to subscriptions/unsubscriptions and responses to invitations sent to observers. It also can accept or reject read requests.

**onSubscription**

`onSubscription(callback: (event: SubscribeEvent | UnSubscribeEvent) => void)`

Setup the callback to process subscribe and unsubscribe notifications

* callback: callback function to receive events

**onResponse**

`onResponse(callback: (event: ResponseEvent) => void): void`

Setup the callback to process response notifications of the create (invite) request's. These are responses to `DataObjectReporter.inviteObservers` or `Syncher.create` invocation.

* callback: callback function to receive events

**onRead**

`onRead(callback: (event: ResponseEvent) => void): void`

### DataObjectObserver
Read only observer object, giving a data view of a remote reporter object.

##### Properties
* owner: HypertyURL address of the owner Hyperty. Reporter Hyperty.

##### Methods

**unsubscribe**

`unsubscribe()`

Remove this subscription from the reporter database. No more data updates will be received.

##### Event Handlers

**onChange**

`onChange(filter: string, callback: (event: ChangeEvent) => void): void`

Setup the callback to process change events from the associated reporter.

* filter: Filter that identifies the field (separated dot path). Accepts * at the end for a more unrestricted filtering.
* allback: callback function to receive events

### DataObjectChild
Child objects are returned from the `DataObject.addChild`.
DataObjectChild are created in relation to a pre-existent path on the parent object schema.
Child objects can be created from a Reporter or Observer and are shared between them.

##### Properties
* childId: URL address for a child, related to an ObjectURL
* data: JSON data for the object

##### Event Handlers

**onResponse**

`onResponse(callback: (event: ReponseEvent) => void): void`

Setup the callback to process response notifications of the child creates. Responses to `DataObject.addChild`

* callback: callback function to receive events

**onChange**

`onChange(callback: (event: ChangeEvent) => void): void`

Setup the callback to process change events from the associated reporter child.

* callback: callback function to receive events

### Methods, Events and Handlers
Every object have methods, and event handlers to map to a pulling and push scheme.
Methods fire actions and Handlers react to actions and respond accordingly.
All events listed on the class diagram are intercepted in an event handler. From a functional perspective, methods like (accept, reject, wait, ...) are responses to an action. Since actions are represented by events, it makes sense that responses are directly related to them. Some rules:
* All events are inherited from the Event interface
* All handlers have method signature of "on\<classifier\>(..., callback)"

### SyncStatus

It is used to get and control the status of a DataObject (local, remote, reporter or observer). The interface is not yet implemented, documentation should be updated accordingly from the provided implementation behavior.

**TODO** Maybe some kind of state machine diagram is needed to define better all the status, and the actions that activate the status transitions.

##### Properties
status: actual state based on the actions: pause, resume, stop, ...

##### Methods
pause: should pause the synchronization process, pause the mission of update messages between the reporter/observer link.
resume: resume the synchronization process from a pause action.
stop: probably the same as unsubscribe, so maybe this method is outdated.

### SyncSubscription

A reference to a remote observer/subscription, associated to a HypertyURL.

##### Properties
url: HypertyURL of the observer.
