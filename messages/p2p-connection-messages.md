### P2P Connection Messages

This doc specifies Messages that are used to manage P2P Connections between different Runtime using P2P Protostubs, including:

-	[P2P Connections managed by the RuntimeUA](#runtime-ua-management)

where,

-	`<P2PHandlerStubURL>` is the Runtime URL of the P2P Handler Protostub
- `<p2p-handler-sp-domain>` is the domain the runtime where the P2P Handler stub is deployed, belongs to.
- `<p2p-handler-runtime-instance-identifier>` is the runtime instance identifier where the P2P Handler stub is deployed.

#### Runtime UA Management

##### Add P2P Handler path

Request by P2P Handler Runtime UA to its domain Message Node Subscription Manager to add the path to P2P Handler stub.

```
"id" : 1,
"type" : "subscribe",
"from" : "hyperty-runtime://<p2p-handler-sp-domain>/<p2p-handler-runtime-instance-identifier>/ua",
"to" : "domain://msg-node.<p2p-handler-sp-domain>/sm",
"body" : { "subscribe" : ["<P2PHandlerStubURL>"], "source" : "hyperty-runtime://<p2p-handler-sp-domain>/p2phandler/<p2p-handler-instance-identifier>" }
```

With this message the setup of the routing path is:

1- who is subscribing: `body.source` or `from` in case there is no `body.source`
2- what to subscribe: `body.subscribe` ie a list of URLs to be subscribed to

###### Response

200OK Response Message sent back by Message Node to P2P Handler Stub Runtime User Agent.

```
"id" : 1,
"type" : "response",
"from" : "domain://msg-node.<p2p-handler-sp-domain>/sm",
"to" : "hyperty-runtime://<p2p-handler-sp-domain>/<p2p-handler-runtime-instance-identifier>/ua",
"body" : { "code" : "2XX" }
```

##### Request to remove P2P Handler Routing Path at P2P Handler Message Node

Message sent by P2P Handler Runtime UA to P2P Handler Message Node to request the removal of the P2P Handler Routing Path.

```
"id" : 2,
"type" : "unsubscribe",
"from" : "hyperty-runtime://<p2p-handler-sp-domain>/<p2p-handler-runtime-instance-identifier>/ua",
"to" : "domain://msg-node.<p2p-handler-sp-domain>/sm",
"body" : { "unsubscribe" : ["<P2PHandlerStubURL>"] }
```

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 2,
"type" : "response",
"from" : "domain://msg-node.<p2p-handler-sp-domain>/sm",
"to" : "hyperty-runtime://<p2p-handler-sp-domain>/<p2p-handler-runtime-instance-identifier>/ua",
"body" : { "code" : "2XX" }
```



#### Registration

##### Set P2P Requester routing path

Request by P2P Requester Registry to its domain Message Node Subscription Manager to add the routing path to P2P Requester stub.

```
"id" : 1,
"type" : "subscribe",
"from" : "hyperty-runtime://<p2p-requester-sp-domain>/<p2p-requester-runtime-instance-identifier>/registry",
"to" : "domain://msg-node.<p2p-requester-sp-domain>/sm",
"body" : { "subscribe" : ["<P2PRequesterStubURL>"], "source" : "hyperty-runtime://<p2p-requester-sp-domain>/p2prequester/<p2p-requester-identifier>" }
```

With this message the setup of the routing path is:

1- who is subscribing: `body.source` or `from` in case there is no `body.source`
2- what to subscribe: `body.subscribe` ie a list of URLs to be subscribed to

###### Response

200OK Response Message sent back by Message Node to P2P Handler Stub Runtime User Agent.

```
"id" : 1,
"type" : "response",
"from" : "domain://msg-node.<p2p-requester-sp-domain>/sm",
"to" : "hyperty-runtime://<p2p-requester-sp-domain>/<p2p-requester-runtime-instance-identifier>/registry",
"body" : { "code" : "2XX" }
```

##### Request to remove P2P Handler Routing Path at P2P Handler Message Node

Message sent by P2P Handler Runtime UA to P2P Handler Message Node to request the removal of the P2P Handler Routing Path.

```
"id" : 2,
"type" : "unsubscribe",
"from" : "hyperty-runtime://<p2p-requester-sp-domain>/<p2p-requester-runtime-instance-identifier>/registry",
"to" : "domain://msg-node.<p2p-requester-sp-domain>/sm",
"body" : { "unsubscribe" : ["<P2PRequesterStubURL>"] }
```

###### Response

200OK Response Message sent back by Message Node to Observer Runtime Sync Manager.

```
"id" : 2,
"type" : "response",
"from" : "domain://msg-node.<p2p-requester-sp-domain>/sm",
"to" : "hyperty-runtime://<p2p-requester-sp-domain>/<p2p-requester-runtime-instance-identifier>/registry",
"body" : { "code" : "2XX" }
```

##### Add Handler listener to minibus for new P2P Connection

Request by P2P Handler Registry to P2P Handler Stub to add its listener to its minibus.

```
"id" : 2,
"type" : "subscribe",
"from" : "hyperty-runtime://<p2p-handler-sp-domain>/<p2p-handler-runtime-instance-identifier>/registry",
"to" : <P2PHandlerStubURL>,
"body" : { "subscribe" : ["<p2p-connectionUrl>"], "source" : <P2PHandlerStubURL> }
```

With this message the P2P Handler Stub invoke `minibus.addListener( <p2p-connectionUrl>, p2pHandlerStub.postmsg() )`


###### Response

200OK Response Message sent back by P2P Handler Stub to P2P Handler Registry.

```
"id" : 2,
"type" : "response",
"from" : <P2PHandlerStubURL>,
"to" : "hyperty-runtime://<p2p-handler-sp-domain>/<p2p-handler-runtime-instance-identifier>/registry",
"body" : { "code" : "2XX" }
```

##### New P2P Connection event

Event to notify the Registry there is a new P2P Connection.

```
"id" : 3,
"type" : "create",
"from" : "<P2PStubURL>",
"to" :  "<P2PStubURL>/status",
"body" : { "value" : "created", "resource" : <remoteRuntimeURL> }
```

##### P2P Connection Update event

Event to notify the Registry P2P Connection status changed.

```
"id" : 3,
"type" : "update",
"from" : "<P2PStubURL>",
"to" :  "<P2PStubURL>/status",
"body" : { "value" : "in-progress|live|failed|disconnected", "resource" : <remoteRuntimeURL> }
```

##### Subscribe for Registry changes

Request to receive notifications about changes in a remote Runtime Registry.

```
"id" : 3,
"type" : "subscribe",
"from" : "<SubscriberURL>",
"to" :  "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "subscribe" : ["hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry/changes"] }
```

With this message the P2P Requester Registry invokes `msgbus.addListener( "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry/changes", p2pSubscriberStubSandbox.postmsg() )`


###### Response

200OK Response Message sent back with all registered Hyperty and Data Objects.

```
"id" : 3,
"type" : "response",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "<SubscriberURL>",
"body" : { "code" : "2XX" , "value" : ["URL1", "URL2", ...]}
```

##### Registry changes update

Message sent by Runtime Registry to Changes Handler when its registration table changes ie Hyperty instances / Object instances are added or removed.

```
"id" : 4,
"type" : "update",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry/changes",
"body" : { "value" : ["URL1", "URL2", ...] }
```
