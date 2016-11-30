### Registration Messages

This doc specifies Messages to be used to manage registrations in the Domain Registry, where,

-	`<RegistryDataObject>` is a JSON object compliant with [RegistryDataObject data model](../datamodel/core/hyperty-registry).
-	`<RegistryDataObjectURL>` is the URL of the entity registered in the domain registry.
-	`<registry-object-identifier>` is a string that is part of the RegistryDataObject.url to uniquely identify the RegistryDataObject in its domain. In the Hyperty URL example `hyperty://example.com/1234-qwert` , "1234-qwert" is the `<registry-object-identifier>`
- `<registry-object-type>` is a string that identifies the type of registry object namely "hyperty" or "dataObject".
-	`<registry-object-url-scheme>` is the URL Scheme used in the RegistryDataObject.url. In this RegistryOject URL example `connection://example.com/1234-qwert` , "connection" is the `<registry-object-url-scheme>`
-	`<userURL>` is the user address compliant with [UserURL data model](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/datamodel/core/address/readme.md#user-url-type). Example: `user://example.com/bob`
-	`<DiscoveredHypertyInstance>` is a JSON object compliant with [HypertyInstance data model](https://github.com/reTHINK-project/dev-service-framework/tree/develop/docs/datamodel/core/hyperty-registry#hyperty-instance).
-	`<discoveredRegistryDataObjects>` is a JSON object compliant with [HypertyDataObjectInstance data model](https://github.com/reTHINK-project/dev-service-framework/tree/develop/docs/datamodel/core/hyperty-registry#hyperty-instance).

#### Registration request

Message sent by the Hyperty Runtime Registry function to Registry Domain server.

```
"id" : 1
"type" : "create",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp-domain>",
"body" : { "value" : <RegistryDataObject> }
```

Message sent by the Registry Domain server (Connector or Protostub) to Hyperty Runtime Registry function.

```
"id" : 1
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200 }
```

#### Unregistration request

**Changed in Phase 2**
Message sent by the Hyperty Runtime Registry function to Registry Domain server.

```
"id" : 4
"type" : "update",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp-domain>",
"body" : { "resource": "/<registry-object-type>/<registry-object-identifier>", "value" : "disconnected", "attribute" : "status" }
```

Message sent by the Registry Domain server (Connector or Protostub) to Hyperty Runtime Registry function.

```
"id" : 4
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200 }
```

#### Publish Registration object status changed to disconnected

**New in Phase 2**
Message sent by the Domain Registry to Message Node.

```
"id" : 4
"type" : "update",
"from" : "domain://registry.<sp-domain>",
"to" : "<RegistryDataObjectURL>/registration",
"body" : { "value" : "disconnected", "attribute" : "status" }
```


#### Update Registration to Live

**New in Phase 2**
Message sent by the Hyperty Runtime Registry function to Registry Domain server.

```
"id" : 5
"type" : "update",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp-domain>",
"body" : { "resource": "<RegistryDataObjectURL>", "value" : { "status": "live", "user": <userURL> } }
```

Reponse Message sent by the Registry Domain server to Hyperty Runtime Registry function.

```
"id" : 5
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200 }
```

#### Publish Registration object status changed to live

**New in Phase 2**
Message sent by the Domain Registry to Message Node.

```
"id" : 4
"type" : "update",
"from" : "domain://registry.<sp-domain>",
"to" : "<RegistryDataObjectURL>/registration",
"body" : { "value" : "live", "attribute" : "status" }
```

#### Subscribe to receive notifications about registration status changes

**New in Phase 2**
Message sent to Message Node subscription manager.

```
"id" : 4
"type" : "subscribe",
"from" : "<someone>",
"to" : "domain://msg-node.<sp-domain>/sm",
"body" : { "subscribe" : "<RegistryDataObjectURL>/registration" }
```


#### keep registration alive

Message sent by the Hyperty Runtime Registry function to Registry Domain server (Connector or Protostub).

```
"id" : 6
"type" : "update",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp-domain>",
"body" : { "resource" : "<RegistryDataObjectURL>" }
```

Response Message sent back by the Registry Domain server to Hyperty Runtime Registry function.

```
"id" : "<6>"
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200 }
```

#### Registry Data Object search per User

Message sent to Registry Domain server to query about all active Hyperty instances or Data Object instances associated to a certain user.

```
"id" : 2,
"type" : "read",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp1>"
"body" : { "resource" : "/<registry-object-url-scheme>/user/<userURL>" }
```

**Response Message returning the discovered Hyperty Instances**

Message sent by Registry Domain server to an Hyperty Instance.

```
"id" : 2
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200, "value" : ["<discoveredRegistryDataObjects>"] }
```

#### Registry Data Object search per GUID

Message sent the Registry Domain server to query about all active Hyperty instances associated to a certain GUID.

```
"id" : 2,
"type" : "read",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp1>"
"body" : { "resource" : "<GuidURL>" }
```

**Response Message returning the discovered Instances**

Message replied by Registry Domain server.

```
"id" : 2
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200, "value" : ["<discoveredRegistryDataObjects>"] }
```


#### Hyperty Instance Query per User and/or per resources and/or per Object Scheme

Message sent by an Hyperty Instance to Registry Domain server to query about all active instances associated to a certain user for some types of Hyperty Resources and data schemes.

```
"id" : 2,
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to" : "domain://registry.<sp1>"
"body" : { "resource": "/<registry-object-url-scheme>/user/<userURL>", "criteria" : { "resources": ["<resources>"], "dataSchemes": ["<schema>"] }}
```

**Response Message returning the discovered Hyperty Instances**

Message sent by Registry Domain server (Connector or Protostub) to an Hyperty Instance.

```
"id" : 2
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code": 200, "value" : ["<discoveredHypertyInstance>"] }
```

#### Query per Registry Data Object URL

**Phase 2 new!**

Message sent to get a certain Domain registry entry, Hyperty instance or Data Object instance.

```
"id" : 3,
"type" : "read",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"to" : "domain://registry.<sp1>"
"body" : { "resource": "<RegistryDataObjectURL>"}
```

**Response Message returning the Registry Data Object**

Message replied by Registry Domain server (Connector or Protostub).

```
"id" : 3
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" :  "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/registry",
"body" : { "code": 200, "value" : ["<RegistryDataObject>"] }
```

#### Registry Not Found Responses

Message sent by Registry Domain server to an Hyperty Instance when no entries are found for a query request.

```
"id" : 2
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code": 404, "description" : "Not Found" }
```

#### Registry Not Found Responses

Message sent by Registry Domain server to an Hyperty Instance when no entries are found for a query request.

```
"id" : 2
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code": 404, "description" : "Not Found" }
```

#### Registry Temporarily Unavailable Responses
**Phase 2 new!**
Message replied by Registry Domain server when only entries are found for unavailable Hyperty Instances ( disconnected status).

```
"id" : 2
"type" : "response",
"from" : "domain://registry.<sp-domain>",
"to" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code": 408, "description" : "Temporarily Unavailable", "value" : ["<discoveredHypertyInstance>"] }
```
