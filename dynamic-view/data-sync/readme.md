---
layout: documentation
title: P2P Data Sync Overview
category: How it Works - Data Synchronization
order: 1
---

The Data Object synchronisation transparently works on top of the Decentralized Messaging Framework.

The Data Object synchronisation is provided by two components in the Runtime:

The [Syncher](https://github.com/reTHINK-project/dev-service-framework/blob/master/src/syncher/Syncher.js) is a singleton Component co-located with the Service Instance, which is in charge of handling all required procedures to manage data synchronisation at the Service instance side, as a Reporter or a Observer service.

The [Runtime Sync Manager](https://github.com/reTHINK-project/dev-runtime-core/blob/master/src/syncher/SyncherManager.js) is a Core Runtime Component, which is in charge of handling authorisation requests to create Sync Data Objects from Reporters and subscription requests to Sync Data Objects from Observers. As soon as authorisation is granted the Sync Manager handles all required MessageBUS listeners in order to setup the Data Sync Stream routing path among Reporters and Observers. I.e., the Runtime Sync Manager provides a Messaging Framework Routing Manager functionality.

The [Message Node Sync Manager](https://github.com/reTHINK-project/dev-service-framework/blob/master/src/syncher/Syncher.js) is a Message Node functionality, which is in charge of handling requests from Runtime Sync Managers in order to setup the Data Sync Stream routing path between the Reporter Runtime and Observers Runtimes. I.e., the Message Node Sync Manager also provides a [Messaging Framework](readme.md) Routing Manager functionality..

![Routing Management for Hyperty Data Syncronisation](../img/howto-data-sync/sync-routing-management.png)

A detailed description of the Data Synchronisation procedures are provided at:

### [Create Hyperty Data Object](data-object-creation.md)

### [Subscribe Hyperty Data Object and receive Updates](data-object-subscription.md)

### [Unsubscribe Hyperty Data Object](data-object-unsubscription.md)

### [Delete Hyperty Data Object](data-object-delete.md)

### [Management of Hyperty Data Object Child](data-object-child.md)

### [Data Sync Observers Resume](observers-data-object-resume.md)

### [Data Sync Reporters Resume](reporters-data-object-resume.md)

### [Hyperty Data Object Reporter delegation](data-object-reporter-delegation.md)

*not implemented yet*
