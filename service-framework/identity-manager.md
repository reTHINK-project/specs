---
layout: documentation
title: Identity Manager API
category: APIs
order: 4
---

*[source](https://github.com/reTHINK-project/dev-service-framework/tree/master/src/identityManager)*

Identities are managed employing a token-based access. A full dynamic view for the usage of the identity manager is provided  [here](https://github.com/reTHINK-project/specs/tree/master/dynamic-view/identity-management).

Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-service-framework/class/src/identityManager/IdentityManager.js~IdentityManager.html).

# IdentityManager Interface

This is the main class that allows Hyperties to discover associated identities.

## Properties

**messageBus:** MiniBus interface to send and receive message, using postMessage and addListener

**runtimeURL:** the Runtime URL

**domain:** the runtime domain

**hypertyURL:** the URL of the Hyperty that is using this library.

## constructor

`constructor(hypertyURL: HypertyURL, runtimeURL: RuntimeURL, msgBus: MiniBus)`

**hypertyURL:** the URL of the Hyperty that is using the Identity Manager library.

**runtimeURL:** the Runtime URL where the Hyperty is executing

**msgBus:** MiniBus interface to send and receive message, using postMessage and addListener

## discover associated Identity

This function allows to discover the User Identity associated to current Hyperty instance or to another Hyperty.

`discoverUserRegistered(type?: string, hypertyURL: HypertyURL): Promise <UserURL>`

**type (optional):** the User Identity information to be retrieved. If not provided, the full User Identity profile is retrieved.

**hypertyURL:** the URL of the Hyperty that the user identity discovery is queried to. If not provided it is assumed the discovery is for the Hyperty using the library itself.

**return:** Promise to the value of the discovered User Identity (that depends on the `type` parameter).
