### Discovery Messages

This doc specifies the Messages to be used when interacting with the Discovery component integrated in runtime core.

#### Discover Hyperties/DataObjects Per User URL or Email

Querying the Domain Registry with a user identifier (either in `url` or `email format`). Optionally also with types of hyperties schemas 
(e.g. `comasdm`), types of hyperties resources (e.g. `chat`) and domain of the registry to search. See method [discoverHyperty(user, 
schema, resources, domain)](https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js#L186)
in [Discovery component](https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js) for example. 

Request to Discovery component (`URL`):
```
"id"   : 1
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/hyperty/user/<userURL>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Request to Discovery component (`EMAIL`):
```
"id"   : 1
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "<email>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component (`Hyperties`):

```
"id"   : 1
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<discoveredHypertyInstance>"] }
```

Not Found Response from Discovery component:

```
"id"   : 1
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover DataObjects by URL

Querying the Domain Registry with a dataObject URL. Optionally also with domain of the registry to search. See method 
[discoverDataObjectPerURL(url, domain)]
(https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js#L413) in 
[Discovery](https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js) for example.

Request to Discovery component:

```
"id"   : 4
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "<RegistryDataObjectURL>" }
```

Response from Discovery component:

```
"id"   : 4
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<RegistryDataObject>"] }
```

Not Found Response from Discovery component:

```
"id"   : 4
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover DataObjects by Name

Querying the Domain Registry with a dataObject name. Optionally also with types of dataObject schemas 
(e.g. `comasdm`), types of dataObject resources (e.g. `chat`) and domain of the registry to search. See method 
[discoverDataObjectPerName(name, schema, resources, domain)]
(https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js#L449) in 
[Discovery](https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js) for example.

Request to Discovery component:

```
"id"   : 5
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "/<registry-object-url-scheme>/name/<dataObjtName>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
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

#### Discover Hyperties by GUID

First, querying the Global Registry with a GUID and then querying the Domain Registry with the associated uIDs. Optionally also 
with types of hyperties schemas (e.g. `comasdm`) and types of hyperties resources (e.g. `chat`).
See method [discoverHypertiesPerGUID(guid, schema, resources)]
(https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js#L128) in 
[Discovery](https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js) for example.

Request to Discovery component:

```
"id"   : 7
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "<GuidURL>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<discoveredHypertyInstance>"] }
```

Not Found Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```

#### Discover Hyperties by User Identifier

First, querying the Discovery Service with a user identifier (i.e. profile data). Second, querying Global Registry with the associated
GUIDs and then querying the Domain Registry with the associated uIDs. Optionally also 
with types of hyperties schemas (e.g. `comasdm`) and types of hyperties resources (e.g. `chat`).
See method [ discoverHypertiesPerUserIdentifier(userIdentifier, schema, resources)]
(https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js#L56) in 
[Discovery](https://github.com/reTHINK-project/dev-runtime-core/blob/discovery-integration/src/discovery/Discovery.js) for example.

Request to Discovery component:

```
"id"   : 7
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"to"   : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"body" : { "resource" : "<userIdentifier>", "criteria" : { "resources" : ["<resources>"], "dataSchemes" : ["<schema>"] }}
```

Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 200, "value" : ["<discoveredHypertyInstance>"] }
```

Not Found Response from Discovery component:

```
"id"   : 7
"type" : "response",
"from" : "runtime://<sp-domain>/<runtime-instance-identifier>/discovery/",
"to"   : "hyperty://<sp-domain>/<hyperty-instance-identifier>",
"body" : { "code" : 404, "description" : "Not Found" }
```
