---
layout: documentation
title: Address Allocation
category: Messages Specification
order: 3
---

Runtime Address Allocation function is a generic core runtime function separated from the runtime registry and from the sync manager.

The following Messages used to manage URL address allocation are specified in this doc. Where,

-	`number" : <integer>` is the number of addresses to be allocated
-	`<scheme>` defines the URL scheme to be used in the address allocation and depends on requested address allocation `<type>` :
	-	`hyperty` for `"hyperty"` address types
	-	`connection`, `comm` or `ctxt` are valid for `"object"` type addresses
-	`"allocationKey" : <key>` a key to be used in a address block deallocation request. Any string is valid but it is suggested to use something associated with the Runtime Instance URL e.g. `hyperty-runtime://<sp-domain>/<runtime-instance-identifier>`

#### Address allocation request


**Message requesting address allocation**

Message sent by the Hyperty Runtime Address Allocation function to Message Node Address Allocation function.

```
"id" : 1
"type" : "CREATE",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/address-allocation",
"to" : "domain://msg-node.<sp-domain>/address-allocation",
"body" : { "scheme" : <scheme>, "value" : {"number" : <integer> ,  "allocationKey" : "<key>"} }
```

**Response Message returning the requested addresses allocation**

Message sent by the Message Node Address Allocation function to Hyperty Runtime Address Allocation function.

```
"id" : 1
"type" : "RESPONSE",
"from" : "domain://msg-node.<sp-domain>/address-allocation",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/address-allocation",
"body" : { "code": 200, "value" : {"allocated": ["<scheme>://<sp-domain>/<identifier>", ...]} }
```

#### Address deallocation request for one block of addresses

**Message to request address deallocation for one block of addresses**

Message sent by the Hyperty Runtime Address Allocation function to Message Node Address Allocation function.

```
"id" : 3
"type" : "DELETE",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/address-allocation",
"to" : "domain://msg-node.<sp-domain>/address-allocation",
"body" : { "resource" : "<key>" }
```

**Response to Message requesting address deallocation for one specific set of addresses**

Message sent by the Message Node Address Allocation function to Hyperty Runtime Address Allocation function.

```
"id" : 3
"type" : "RESPONSE",
"from" : "domain://msg-node.<sp-domain>/address-allocation",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/address-allocation",
"body" : { "code": 200 }
```

#### Address deallocation request for one or more addresses

**Message to request address deallocation for one or more addresses**

Message sent by the Hyperty Runtime Address Allocation function to Message Node Address Allocation function.

```
"id" : 2
"type" : "DELETE",
"from" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/address-allocation",
"to" : "domain://msg-node.<sp-domain>/address-allocation",
"body" : { "childrenResources" : ["<scheme>://<sp-domain>/<identifier>", ...] }
```

**Response to Message requesting address deallocation for one specific set of addresses**

Message sent by the Message Node Address Allocation function to Hyperty Runtime Address Allocation function.

```
"id" : 2
"type" : "RESPONSE",
"from" : "domain://msg-node.<sp-domain>/address-allocation",
"to" : "hyperty-runtime://<sp-domain>/<runtime-instance-identifier>/address-allocation",
"body" : { "code": 200  }
```
