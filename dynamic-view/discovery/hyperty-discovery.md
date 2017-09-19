---
layout: documentation
title: Discovery process
category: How it Works - Discovery
order: 1
---

Hyperty instances and Data Object instances can be discovered according to different criteria including users, names, supported HypertyResources and Schemes. Discovery is provided by two main components in the Hyperty Runtime:

The [Runtime Core Discovery](https://github.com/reTHINK-project/dev-runtime-core/blob/master/src/discovery/CoreDiscovery.js) is a Core Runtime Component that performs the required queries to available Registries in order to handle discovery requests coming from hyperties.

The [Discovery Lib](https://github.com/reTHINK-project/dev-service-framework/blob/master/src/syncher/Syncher.js) works like a discovery proxy for Runtime Core Discovery components by exposing to the Hyperty Instance a discovery API. These Discovery requests are then forwarded to the Runtime Core Discovery component. The Discovery Results are returned in Discovery Objects that provides event handlers for registration status changes of discovered Hyperties or Data Objects.

The Domain Registry exposes a REST API to handle the discovery requestes coming from the Runtime Core Discovery component.

The Detailed description of the Discovery process is provided below.

*to be updated*

![Figure discover Hyperty](discover-hyperty.png)

Check Messages Specification [here](../../../specs/messages/registration-messages.md#hyperty-instance-query-per-user)
