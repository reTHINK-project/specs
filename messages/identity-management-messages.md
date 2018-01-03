---
layout: documentation
title: Identity Management
category: Messages Specification
order: 6
---

This doc specifies Messages to be used to manage identities, where,


-	`<contents-value>` is a JSON object compliant with ...
-	`<origin-value>` is a JSON object compliant with ...
-	`<usernameHint-value>` is a JSON object compliant with ...
-	`<assertion-value>` is a JSON object compliant with ...
- `<identity-values>` is a JSON object compliant with ...
- `<identity-value>` is a JSON object compliant with ...
- `<idp-values>` is a JSON object compliant with ...
- `<email-value>` is a JSON object compliant with ...
- `<idp-domain>` is a JSON object compliant with ...
- `<publicKey-value>` is a string containing the user's public key
- `<urlreceived-value>` is a JSON object compliant with ...

### Identity Module -> Identity GUI

####   show Identity GUI

Message sent by the Identity Module to Identity GUI to show the Identity GUI.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
,
"body" : { "method" : "show" }
```

### Identity GUI -> Identity Provider (Idp Proxy)

####   get Login Endpoint

Message sent by the Identity GUI to Identity Management (IDP Proxy) to retrieve the Loging endpoint.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "domain-idp://<idp-domain>",
"body" : { "method" : "getLoginEndpoint" }
```

response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code": 200, "value" : "<loginEndPoint>" }
```


#### generate Assertion

Message sent by the Identity GUI function to Identity Management (IDP Proxy) to generate an Identity Assertion.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/identity/<user identifier>", "method" : "generateAssertion" , "params" : { ["contents" : "<publicKey-value>", "origin" : "<origin-value>", "usernameHint" : "<usernameHint-value>" , "ipDomain" : "<idp-domain>" ] }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<assertion-value>" }
```


#### validate Assertion

Message sent by the Identity Module function to Identity Management (IDP Proxy) to validate an Identity Assertion.

```
"id" : 2
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/identity/<user identifier>", "method" : "validateAssertion" , "params" : { ["assertion" : "<assertion-value>", "origin" : "<origin-value>"] }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 2
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<boolean?>" }
```

####   get Access Token Authorisation Endpoint

Message sent by the Identity GUI to Identity Management (IDP Proxy) to retrieve the Access Token Authorisation Endpoint.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "domain-idp://<idp-domain>",
"body" : { "method" : "getAccessTokenAuthorisationEndpoint" }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code": 200, "value" : "<AccessTokenAuthorisationEndPoint>" }
```

#### get Access Token

Message sent by the Identity GUI function to Identity Management (IDP Proxy) to get an Access Token for a set of Hyperty Resources.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/identity/<user identifier>", "method" : "getAccessToken" , "params" : { "resources" : "[<resources-value>]" }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<access-token-value>" }
```

### Identity Module -> Identity Provider (Idp Proxy)

#### refresh Assertion

Message sent by the Identity GUI function to Identity Management (IDP Proxy) to refresh an Identity Assertion.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/identity/<user URL>", "method" : "refreshAssertion" , "params" : { "identity" : "<identity-value>" }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<assertion-value>" }
```

#### refresh Access Token

Message sent by the Identity GUI function to Identity Management (IDP Proxy) to refresh an Access Token.

```
"id" : 1
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/accessTokens/<user URL>", "method" : "refreshAccessToken" , "params" : { "accessToken" : "<access-token-value>" }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "response",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<access-token-value>" }
```

### Identity GUI -> Identity Module

####   get My Public Key

Message sent by the Identity GUI to the Crypto Manager to retrieve the user public key.

```
"id" : 1
"type" : "read",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
,
"body" : { "resource" : "myPublicKey" }
```

response Message sent back from the Crypto Manager.

```
"id" : 1
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/crypto",

"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code": 200, "value" : "<publicKey-value>" }
```

#### Deploy Identity Module GUI

Request made by the identity-gui to the identity module for deploying the gui.

```
"id" : 3
"type" : "execute",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "deployGUI" , "params" : {} }
```

response by the identity module to the identity-gui.

```
"id" : 3
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : {} , "code" : 200 }
```

#### Get Identities To Choose From

Request made by the identity-gui to the identity module for the identities available to choose.

```
"id" : 4
"type" : "read",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resources" : ["identities","idps"] }
```

response by the identity module to the identity-gui.

```
"id" : 4
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "value" : { ["identities" : "<identity-values>" , "idps" : "<idp-values>"] } , "code" : 200 }
```

#### Remove Identity

Request made by the identity-gui to the identity module for unregistering one identity.

```
"id" : 5
"type" : "delete",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "<userURL>" } }
```

Response by the identity module to the identity-gui.

```
"id" : 5
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code" : 200 }
```



#### Add Identity

Request made by the identity-gui to the identity module to add identity.

```
"id" : 9
"type" : "create",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identities/<userURL>" , "value" : "<identity-value>" }
```

Response by the identity module to the identity-gui.

```
"id" : 9
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code" : 200 }
```

#### Set Default Identity

Request made by the identity-gui to the identity module to add identity.

```
"id" : 9
"type" : "update",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "defaultIdentity" , "value" : "<defaultIdentity-url-value>" }
```

Response by the identity module to the identity-gui.

```
"id" : 9
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code" : 200 }
```

#### Add Access Token

Request made by the identity-gui to the identity module to add Access Token.

```
"id" : 9
"type" : "create",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "accessTokens/<external-service-domain>" , "value" : "<access-token-value>" }
```

Response by the identity module to the identity-gui.

```
"id" : 9
"type" : "response",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "code" : 200 }
```
