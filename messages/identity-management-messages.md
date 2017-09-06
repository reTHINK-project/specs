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
- `<keypair-value>` is a JSON object compliant with ...
- `<urlreceived-value>` is a JSON object compliant with ...

#### generate Assertion

Message sent by the Identity Module function to Identity Management (IDP Proxy) to generate an Identity Assertion.

```
"id" : 1
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/identity/<user identifier>", "method" : "generateAssertion" , "params" : { ["contents" : "<contents-value>", "origin" : "<origin-value>", "usernameHint" : "<usernameHint-value>" , "ipDomain" : "<idp-domain>" ] }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 1
"type" : "RESPONSE",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<assertion-value>" }
```

#### validate Assertion

Message sent by the Identity Module function to Identity Management (IDP Proxy) to validate an Identity Assertion.

```
"id" : 2
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "domain-idp://<idp-domain>",
"body" : { "resource" : "/identity/<user identifier>", "method" : "validateAssertion" , "params" : { ["assertion" : "<assertion-value>", "origin" : "<origin-value>"] }
```

Response Message sent back from the Identity Management (IDP Proxy).

```
"id" : 2
"type" : "RESPONSE",
"from" : "domain-idp://<idp-domain>",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "code": 200, "value" : "<boolean?>" }
```

#### Deploy Identity Module GUI

Request made by the identity-gui to the identity module for deploying the gui.

```
"id" : 3
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "deployGUI" , "params" : {} }
```

Response by the identity module to the identity-gui.

```
"id" : 3
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : {} , "code" : 200 }
```

#### Get Identities To Choose From

Request made by the identity-gui to the identity module for the identities available to choose.

```
"id" : 4
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "getIdentitiesToChoose" , "params" : {} }
```

Response by the identity module to the identity-gui.

```
"id" : 4
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : { ["identities" : "<identity-values>" , "idps" : "<idp-values>"] } , "code" : 200 }
```

#### Unregister One Identity

Request made by the identity-gui to the identity module for unregistering one identity.

```
"id" : 5
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "unregisterIdentity" , "params" : { ["email" : "<email-value>" ] } }
```

Response by the identity module to the identity-gui.

```
"id" : 5
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : { } , "code" : 200 }
```

#### Generate RSA Key Pair

Request made by the identity-gui to the identity module for generating a new RSA compliant key pair.

```
"id" : 6
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "generateRSAKeyPair" , "params" : { } }
```

Response by the identity module to the identity-gui.

```
"id" : 6
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : "<keypair-value>" , "code" : 200 }
```

#### Send a Generate Assertion Message To IdP Proxy

Request made by the identity-gui to the identity module for sending a generateAssertion message to the IdP Proxy.

```
"id" : 7
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "sendGenerateMessage" , "params" : { [ "contents" : "<contents-value>", "origin" : "<origin-value>", "usernameHint" : "<usernameHint-value>", "ipDomain" : "<idp-domain>" ] } }
```

Response by the identity module to the identity-gui.

```
"id" : 7
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : "<assertion-value>" , "code" : 200 }
```

#### Open Identity Selection Pop-up

Request made by the identity-gui to the identity module for opening the identity selection pop-up.

```
"id" : 8
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "openPopup" , "params" : { [ "urlreceived" : "<urlreceived-value>" ] } }
```

Response by the identity module to the identity-gui.

```
"id" : 8
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : "<url-value>" , "code" : 200 }
```

#### Store One Identity

Request made by the identity-gui to the identity module for storing one identity.

```
"id" : 9
"type" : "EXECUTE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"body" : { "resource" : "identity" , "method" : "storeIdentity" , "params" : { [ "assertion" : "<assertion-value>" , "keyPair" : "<keypair-value>" ] } }
```

Response by the identity module to the identity-gui.

```
"id" : 9
"type" : "RESPONSE",
"from" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/idm",
"to" : "hyperty-runtime://<runtime-domain>/<runtime-instance-identifier>/identity-gui",
"body" : { "type" : "execute" , "value" : "<identity-value>" , "code" : 200 }
```
