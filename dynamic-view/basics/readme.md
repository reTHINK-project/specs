---
layout: documentation
title: Overview on reTHINK Basic Mechanisms
category: How it Works - Basics
order: 1
---

------------

The heart of reTHINK framework is the Hyperty Core Runtime that is platform agnostic and currently implemented in Javascript, with specific extensions for Browser Runtime and NodeJS Servers. The main Runtime Core Components providing the basic mechanisms are:

-- RuntimeUA: handles the life-cycle of deployable components ie it deploys Hyperties, Protostubs and IdP Proxies in the most appropriate sandboxes. During the Hyperty deployment process the RuntimeUA asks the Identity Module to provide an authenticated Identity to be associated with the new Hyperty Instance. More information [here](../identity-managemenet/readme.md).

-- Runtime Registry: it handles the registration of Hyperties at the Domain Registry, when requested by the RuntimeUA during the deployment process. The Runtime Registry is also responsible to resolve the best Protostub to be used to deliver a message outside the Hyperty Runtime, when requested by the Message BUS. In case no Protostub is not available it will trigger the Deployment of a new Protostub that will be handled by the RuntimeUA.

-- Message BUS: handles the delivery of messages inside the Runtime. When no listener is registered for a certain target address (header `to` of the message), it requests the `Registry.resolve()` to provide the address of the Protostub that will deliver the message outside the Hyperty Runtime. Before a message is delivered, the Message Bus asks the Policy Engine to authorize it.


The first time the user is using the reTHINK framework in the device, the Hyperty Runtime is downloaded from the catalogue and instantiated. The runtime is cached locally and only loaded again for new versions.
The deployment of the Runtime is fully detailed [here](deploy-runtime.md).

During the Runtime deployment process, the P2P Handler protostub is deployed in order to be able to handle P2P Connections requests from other Hyperty Runtimes. Then, the Domain Protostub will also be deployed and used to connect the Runtime to Domain's Message Node, in order to setup the message delivery path to receive P2P Connection requests. The process to deploy any Protostub is fully detailed [here](deploy-protostub.md). It should be noted that also the source code and the descriptors of the Protostubs are cached locally and are only renewed from the Catalogue with new releases.

As soon as the Application requires to use an Hyperty, the [Hyperty deployment process](deploy-hyperty.md) is performed, including its download from the catalogue defined by the Application. Once again, the Hyperty source code and associated descriptor, is cached locally and will be only loaded again for newer versions. A new address is allocated to the Hyperty as fully described [here](register-hyperty.md) which is reused next time the Hyperty is executed. The Hyperty instance is registered in the Domain Registry as described [here](register-hyperty.md) and associated to an user identity as described [here](../identity-managemenet/user-to-hyperty-binding.md).

Hyperties communicate each other through messages exchanged in a peer-to-peer mode using the reTHINK Decentralized Messaging Framework and the message routing mechanism of the Message Bus as described [here](bus-msg-routing.md). Messages are routed to addresses external to the runtime by using as much as possible P2P Stubs as described [here](resolve-routing-address.md) otherwise messages are [routed to Message Node Protostubs](resolve-msg-node-address.md) i.e. the message is delivered to the remote Runtime through a Message Node. In both situations new Protostubs may have to be deployed if not available yet. For P2P Connections, a P2P Requester Stub is dynamically selected in order to be compliant with the remote P2P Handler Stub. Then, the P2P Connection is established as defined [here](p2p-setup.md).
