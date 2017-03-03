### Discovery Messages

This doc specifies the Messages to be used when interacting with the Discovery component integrated in runtime core.

#### Discover Hyperties/DataObjects by User URL or Email

Querying the Domain Registry with a user identifier (either in `url` or `email format`). Optionally also with types of hyperties/dataObjects schemas (e.g. `comasdm`) and types of hyperties/dataObjects resources (e.g. `chat`).

Request to Discovery component:
```
"id"   : 1
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/<registry-object-type>/user/<userIdentifier>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component:

```
"id"   : 1
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<discoveredRegistryObjects>"] }
```

Not Found Response from Discovery component:

```
"id"   : 1
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover Hyperty/DataObject by DataObject/Hyperty URL

Querying the Domain Registry with a instance URL (Hyperty or DataObject). Optionally also with domain of the registry to search.

Request to Discovery component:

```
"id"   : 4
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/<registry-object-type>/url/<registry-object-url-scheme>" }
```

Response from Discovery component:

```
"id"   : 4
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : "<RegistryObject>" }
```

Not Found Response from Discovery component:

```
"id"   : 4
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover DataObject by DataObject Name

Querying the Domain Registry with a dataObject name. Optionally also with types of dataObject schemas 
(e.g. `comasdm`), types of dataObject resources (e.g. `chat`) and domain of the registry to search.

Request to Discovery component:

```
"id"   : 5
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/<registry-object-type>/name/"<RegistryDataObjectName>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component:

```
"id"   : 5
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<RegistryDataObject>"] }
```

Not Found Response from Discovery component:

```
"id"   : 5
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover Hyperties/DataObjects by GUID

First, querying the Global Registry with a GUID and then querying the Domain Registry with the associated uIDs. Optionally also 
with types of hyperties schemas (e.g. `comasdm`) and types of hyperties resources (e.g. `chat`).

Request to Discovery component:

```
"id"   : 7
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/<registry-object-type>/guid/<GuidURL>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<discoveredRegistryObjects>"] }
```

Not Found Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover Hyperties/DataObjects by Profile Data

First, querying the Discovery Service with some Profile Data (i.e. username). Second, querying Global Registry with the associated
GUIDs and then querying the Domain Registry with the associated uIDs. Optionally also 
with types of hyperties schemas (e.g. `comasdm`) and types of hyperties resources (e.g. `chat`).

Request to Discovery component:

```
"id"   : 7
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/<registry-object-type>/profiledata/<profiledata>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<discoveredRegistryObjects>"] }
```

Not Found Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```
