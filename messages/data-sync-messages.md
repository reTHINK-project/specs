### Hyperty Data Object Synchronisation Messages

This doc specifies Messages that are used to manage Hyperty Data Object Synchronisation, including:

-	[Synchronisation Management Messages by Syncher Reporter](#synchronisation-management-by-syncher-reporter)
-	[Synchronisation Management by Syncher Observer](#synchronisation-management-by-syncher-observer)
-	[Synchronisation management by Sync Manager Reporter](#synchronisation-management-by-sync-manager-reporter)
-	[Synchronisation management by Sync Manager Observer](#synchronisation-management-by-sync-manager-observer)
-	[Synchronisation Management by Message Node](#synchronisation-management-by-message-node)
-	[Synchronisation Messages among Synchers](#synchronisation-messages-among-synchers)
-	[Data Object Read Messages between Synchers](#data-object-read)

where,

-	`<ObjectURL>` is any valid [Data Object URL](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/datamodel/address/readme.md) including CommunicationURL, ConnectionURL and ContextURL. Example: `"comm://example.com/<alice>/123456"`
-	`<json object>` is the Data Object instance itself
-	`<ChildDataObject>` is a Child Data Object instance itself

#### Synchronisation Management by Syncher Reporter

##### Hyperty Data Object Creation

Message sent by the Reporter Syncher Hyperty to Reporter Runtime Sync Manager.

```
"id"   : 1,
"type" : "create",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "hyperty-runtime://<sp-domain>/<hyperty-runtime-instance-identifier>/sm",
"body" : { "resource" : "<ObjectURL>", "authorise" : [{"HypertyURL"}], "value" : "<json object> , "schema" : "hyperty-catalogue://<sp-domain>/dataObjectSchema/<schema-identifier>", "p2p" : true|false, "store" : true|false }
```

**note:** `"resource"` is present in the body in case the ObjectURL is already known by the reporter eg to resume a data sync stream or for a Reporter delegation procedure.
**note2:** `"p2p"` is optional and indicates if the sync data stream should use p2p protostubs.
**note3:** `"store"` is optional and indicates if the sync data object should be stored localy by the sync manager.

###### Response

Reporter Runtime Sync Manager Response Message sent to the Reporter Syncher Hyperty to confirm Object Data creation.

```
"id"   : 1,
"type" : "response",
"from" : "hyperty-runtime://<sp-domain>/<hyperty-runtime-instance-identifier>/sm",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : "200", "resource" : "<ObjectURL>", "childrenResources" : [{"<resource-children-name>"}] }
```

Reporter Runtime Sync Manager forwards to the Reporter Syncher Hyperty, Response Messages sent by invited Observer Hyperties.

```
"id"   : 1,
"type" : "response",
"from" : "<ObjectURL>/subscription",
"to"   : "<ObjectURL>",
"body" : { "code" : "1XX\2XX" , "source" : "hyperty://<sp-domain>/<hyperty-observer-instance-identifier>" }
```

##### Delete Data Object requested by Reporter

Message sent by Object Reporter Hyperty to Reporter Runtime Sync Manager.

```
"id"   : "6",
"type" : "delete",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "hyperty-runtime://<sp-domain>/<hyperty-runtime-instance-identifier>/sm",
"body" : { "resource" : "<ObjectURL>" }
```

###### Response

Response Message sent back by Reporter Runtime Sync Manager to Object Reporter Hyperty.

```
"id"   : "6",
"type" : "response",
"from" : "hyperty-runtime://<sp-domain>/<hyperty-runtime-instance-identifier>/sm",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : "200" }
```

#### Synchronisation Management by Syncher Observer

##### Hyperty request to be an Observer

Message sent by Observer (candidate) Hyperty Instance to the Observer Runtime Sync Manager.

```
"id" : 1,
"type" : "subscribe",
"from" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "resource" : "<ObjectURL>" , "schema" : "hyperty-catalogue://<sp-domain>/dataObjectSchema/<schema-identifier>" , "p2p" : true|false , "store" : true|false}
```

**note:** `"p2p"` is optional and indicates if the sync data stream should use p2p protostubs.
**note1:** `"store"` is optional and indicates if the sync data object should should be stored localy by the sync manager.

###### Response

100OK Provisional Response Message sent back by Observer Runtime Sync Manager to Observer Hyperty Instance containing in the body the resources, in case they exist.

```
"id" : 1,
"type" : "response",
"from" : "hyperty-runtime://<sp-domain>/<hyperty-runtime-instance-identifier>/sm",
"to" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : "100", "resources" : [{"<resource-children-name>"}] }
```

200OK Response Message sent back by Observer Runtime Sync Manager to Observer Hyperty Instance containing in the body the most updated version of Data Object.

```
"id" : 1,
"type" : "response",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>",
"body" : { "code" : "2XX", "value" : "<data object>"  }
```
#### Query the Sync Manager about Observer and Reporter Objects to be resumed

Read Message sent by Observer Hyperty to local Sync Manager.

```
"id" : 1,
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-observer-identifier>",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm"
```

##### Successful Read Response with Data Objects to be resumed as Observers and Reporters

Successful Read Response Message from Synch Manager to Observer Hyperty with temporary local stored subscribed data objects.

```
"id" : 1,
"type" : "response",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "hyperty://<sp-domain>/<hyperty-observer-identifier>",
"body" : { "code" : "100" , "value" : { "observers" : [<data object>] , "reporters" : [<data object>] } }
```

Successful Read Response Message from Synch Manager to Hyperty with final updated data object.

```
"id" : 1,
"type" : "response",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "hyperty://<sp-domain>/<hyperty-observer-identifier>",
"body" : { "code" : "200" , "value" : <data object> }
```

##### Not Found Read Response

Not Found Read Response Message from Synch Manager to Observer Hyperty.

```
"id" : 1,
"type" : "response",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "hyperty://<sp-domain>/<hyperty-observer-identifier>",
"body" : { "code" : "404" , "description" : "not found" }
```


##### Data Object Unsubscription request by Observer Hyperty

Message sent by Object Observer Hyperty to Runtime Observer Sync Manager .

```
"id" : 7,
"type" : "unsubscribe",
"from" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "resource" : "<ObjectURL>" }
```

###### Unsubscription Response

Response Message sent back by Runtime Observer Sync Manager to Object Observer Hyperty.

```
"id" : 7,
"type" : "response",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>",
"body" : { "code" : "2XX" }
```


Response to Object Delete sent by Runtime Reporter

#### Synchronisation management by Sync Manager Reporter

##### Observer Invitation

Message sent by the Reporter Runtime Sync Manager to invited Observer Hyperty Instance.

```
"id" : 1,
"type" : "create",
"from" : "<ObjectURL>/subscription",
"to" : "hyperty://<sp-domain>/<hyperty-observer-instance-identifier>",
"body" : { "source" : "hyperty://<sp-domain>/<hyperty-instance-identifier>", "value" : "<json object >", "schema" : "hyperty-catalogue://<sp-domain>/dataObjectSchema/<schema-identifier>" }
```

###### Response

Response Message sent back by invited Hyperty Instance to the Reporter Runtime Sync Manager.

```
"id" : 1,
"type" : "response",
"from" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>",
"to" : "<ObjectURL>/subscription",
"body" : { "code" : "1XX\2XX" }
```

##### All Observers are requested to delete Data Object

Message sent by Reporter Runtime Sync Manager to Object Changes Handler.

```
"id" : 6,
"type" : "delete",
"from" : "<ObjectURL>/subscription",
"to" : "<ObjectURL>/changes"
```

###### Response to Object Delete

Message sent by Observer Runtime Sync Manager to Object Subscription Handler, on behalf of Observer Hyperty.

```
"id" : 6,
"type" : "response",
"from" : "<ObjectURL>/changes",
"to" : "<ObjectURL>/subscription",
"body" : { "code" : "2XX", "source" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>" }
```

#### Synchronisation management by Sync Manager Observer

##### Observer Subscription request sent to Data Object Subscription Handler

Message sent by Observer Runtime Sync Manager to Data Object Subscription Handler.

```
"id" : 2,
"type" : "subscribe",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "<ObjectURL>/subscription",
"body" : {  "source" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>" }
```

###### Response

200OK Response Message sent back by Data Object Subscription Handler to Observer Runtime Sync Manager containing in the body the most updated version of Data Object.

```
"id" : 2,
"type" : "response",
"from" : "<ObjectURL>/subscription",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX", "value" : "<data object>"  }
```

##### Observer Unsubscription request sent to Data Object Subscription Handler

Message sent by Observer Runtime Sync Manager to Data Object Subscription Handler.

```
"id" : 8,
"type" : "unsubscribe",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "<ObjectURL>/subscription",
"body" : {  "source" : "hyperty://<observer-sp-domain>/<hyperty-observer-instance-identifier>", "childrenResources" : [{"<resource-children-name>"}] }
```

###### Response

200OK Response Message sent back by Data Object Subscription Handler to Observer Runtime Sync Manager.

```
"id" : 8,
"type" : "response",
"from" : "<ObjectURL>/subscription",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX" }
```

#### Synchronisation Management by Message Node

##### Reporter Data Sync Routing Path setup request at Reporter Message Node for a new Data Object

Message sent by Reporter Runtime Sync Manager to Reporter Message Node to request the setup of the Data Sync Routing Path for a new Data Object.

```
"id" : 1,
"type" : "subscribe",
"from" : "hyperty-runtime://<reporter-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "domain://msg-node.<reporter-sp-domain>/sm",
"body" : { "resources" : ["<ObjectURL>","<ObjectURL>/subscription", "<ObjectURL>/children/<resource-children-name1>", "<ObjectURL>/children/<resource-children-name2>",.. ], "source" : "hyperty-runtime://<reporter-sp-domain>/<hyperty-reporter-runtime-instance-identifier>" }
```

With this message the setup of the routing path is:

1- who is subscribing: `body.source` or `from` in case there is no `body.source`
2- what to subscribe: `body.subscribe` ie a list of URLs to be subscribed to

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 1,
"type" : "response",
"from" : "domain://msg-node.<reporter-sp-domain>/sm",
"to" : "hyperty-runtime://<reporter-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX" }
```

##### Data Sync Routing Path setup request at Observer Message Node

Message sent by Observer Runtime Sync Manager to Observer Message Node to request the setup of the Data Sync Routing Path.

```
"id" : 1,
"type" : "subscribe",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "domain://msg-node.<observer-sp-domain>/sm",
"body" : { "resources" : ["<ObjectURL>/changes", "<ObjectURL>/children/<resource-children-name1>", "<ObjectURL>/children/<resource-children-name2>",.. ], "source" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>" }
```

With this message the setup of the routing path is:

1- who is subscribing: `body.source` or `from` in case there is no `body.source`
2- what to subscribe: `body.subscribe` ie a list of URLs to be subscribed to

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 1,
"type" : "response",
"from" : "domain://msg-node.<observer-sp-domain>/sm",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX" }
```

##### Data Sync Routing Path setup request at Reporter Message Node

Message sent by Observer Runtime Sync Manager to Reporter Message Node to request the setup of the Data Sync Routing Path.

```
"id" : 1,
"type" : "subscribe",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "domain://msg-node.<reporter-sp-domain>/sm",
"body" : { "resources" : ["<ObjectURL>/changes", "<ObjectURL>/children/<resource-children-name1>", "<ObjectURL>/children/<resource-children-name2>",.. ], "source" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>" }
```

With this message the setup of the routing path is:

1- who is subscribing: `body.source` or `from` in case there is no `body.source`
2- what to subscribe: `body.subscribe` ie a list of URLs to be subscribed to

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 1,
"type" : "response",
"from" : "domain://msg-node.<reporter-sp-domain>/sm",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX" }
```

##### Request to remove Data Sync Routing Path at Observer Message Node

Message sent by Observer Runtime Sync Manager to Observer Message Node to request the removal of the Data Sync Routing Path.

```
"id" : 9,
"type" : "unsubscribe",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "domain://msg-node.<observer-sp-domain>/sm",
"body" : { "resources" : ["<ObjectURL>/changes", "<ObjectURL>/children/<resource-children-name1>", "<ObjectURL>/children/<resource-children-name2>",.. ], }
```

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 9,
"type" : "response",
"from" : "domain://msg-node.<observer-sp-domain>/sm",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX" }
```


##### Request to remove Data Sync Routing Path at Reporter Message Node

Message sent by Observer Runtime Sync Manager to Reporter Message Node to request the removal of the Data Sync Routing Path.

```
"id" : 9,
"type" : "unsubscribe",
"from" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"to" : "domain://msg-node.<reporter-sp-domain>/sm",
"body" : { "resources" : ["<ObjectURL>/changes", "<ObjectURL>/children/<resource-children-name1>", "<ObjectURL>/children/<resource-children-name2>",.. ], }
```

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 9,
"type" : "response",
"from" : "domain://msg-node.<observer-sp-domain>/sm",
"to" : "hyperty-runtime://<observer-sp-domain>/<hyperty-observer-runtime-instance-identifier>/sm",
"body" : { "code" : "2XX" }
```

#### Synchronisation Messages among Synchers

##### Data Object Update

Message sent by Object Reporter Hyperty to Data Object Changes Handler.

```
"id" : 3,
"type" : "update",
"from" : "<ObjectURL>",
"to" : "<ObjectURL>/changes",
"body" : { "attribute": "attribute path, dot separated", "value" : "changed value" }
```

Message sent by Object Reporter Hyperty to Data Object Changes Handler when a field should be removed.

```
"id" : 3,
"type" : "update",
"from" : "<ObjectURL>",
"to" : "<ObjectURL>/changes",
"body" : { "attribute": "attribute path, dot separated" }
```

Message sent by Object Reporter Hyperty to Data Object Changes Handler when an array is changed.

```
"id" : 3,
"type" : "update",
"from" : "<ObjectURL>",
"to" : "<ObjectURL>/changes",
"body" : { "attributeType" : "array", "operation" : "add | remove", "value" : <changed value>  }
```

##### Creation of Data Object child

Message sent by Child Object Reporter Hyperty to Data Object Parent Children Handler.

```
"id" : 4,
"type" : "create",
"from" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>",
"to" : "<ObjectURL>/children/<resource-children-name>",
"body" : { "resource" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>#<1>", "value" : { "<ChildDataObject>" } }
```

###### Response

(Optional) Response Message from Child Object Observer Hyperty to Child Object Reporter Hyperty.

```
"id" : 4,
"type" : "response",
"from" : "<ObjectURL>/children/<resource-children-name>",
"to" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>",
"body" : { "code" : "2XX" , "source" : "hyperty://<sp-domain>/<hyperty-child-observer-identifier>" }
```

##### Update of Data Object Child

Message sent by Child Object Reporter Hyperty to Data Object Parent Children Handler.

```
"id" : 5,
"type" : "update",
"from" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>",
"to" : "<ObjectURL>/children/<resource-children-name>",
"body" : { "resource" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>#<1>", "value" : { "<UpdatedChildDataObject>" } }
```

##### Delete of Data Object Child

Message sent by Child Object Reporter Hyperty to Data Object Parent Children Handler.

```
"id" : 5,
"type" : "delete",
"from" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>",
"to" : "<ObjectURL>/children/<resource-children-name>",
"body" : { "resource" : "hyperty://<sp-domain>/<hyperty-child-reporter-identifier>#<1>" }
```

#### Data Object Read

Read Message sent by Reader Hyperty to Data Object URL.

```
"id" : 1,
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-reader-identifier>",
"to" : "<ObjectURL>"
```

##### Successful Read Response with Data Object

Successful Read Response Message from Reporter Hyperty to Reader Hyperty.

```
"id" : 1,
"type" : "response",
"from" : "<ObjectURL>",
"to" : "hyperty://<sp-domain>/<hyperty-reader-identifier>",
"body" : { "code" : "2XX" , "value" : "<data object>" }
```

#### Query the Sync Manager about subscribed Objects

Read Message sent by Reader Hyperty to Data Object URL.

```
"id" : 1,
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-reader-identifier>",
"to" : "<ObjectURL>"
```

##### Successful Read Response with Data Object

Successful Read Response Message from Reporter Hyperty to Reader Hyperty.

```
"id" : 1,
"type" : "response",
"from" : "<ObjectURL>",
"to" : "hyperty://<sp-domain>/<hyperty-reader-identifier>",
"body" : { "code" : "2XX" , "value" : "<data object>" }
```

##### Unauthorised Read Response

Unauthorised Read Response Message from Reporter Hyperty to Reader Hyperty.

```
"id" : 1,
"type" : "response",
"from" : "<ObjectURL>",
"to" : "hyperty://<sp-domain>/<hyperty-reader-identifier>",
"body" : { "code" : "401" , "description" : "unauthorized" }
```
