---
layout: documentation
title: Hyperty Runtime Overview
category: Runtime
order: 1
---

--------------------


The Hyperty Runtime supports the execution of Hyperties providing all required functionalities to securely manage its life-cycle, only consuming back-end support Services when strictly required.
Thus, the Runtime features a catalogue functionality from where Hyperties source packages are deployed, as well as a registry functionality to handle the registration of Hyperty instances in order to make the Hyperties reachable within the runtime.

The Runtime design enables the reuse of the core runtime components through different platforms including Browsers, Standalone Mobile Application, Network Side Application Servers and more constrained M2M/IoT standalone devices.

The Runtime design enables the reuse of the core runtime components through different platforms including Browsers, Standalone Mobile Application, Network Side Application Servers and more constrained M2M/IoT standalone devices.

The Hyperty Runtime is designed to support the execution of multiple untrusted software components, namely Applications, Hyperties, ProtoStubs, and Hyperty Core Runtime components.
Therefore, to provide for the overall system security, it is necessary to ensure that different components execute in isolation from each other and to restrict their communication path to secure channels.

To enforce isolation, the Hyperty Runtime implements a sandboxing mechanism which confines components downloaded from different Service Providers to independent sandboxes.
Applications and Hyperties may or may not run within the same sandbox depending on their trust level.
If they are downloaded from the same Service Provider, it is assumed that they trust each other and that they can share the same sandbox.
Otherwise, Hyperties and Application run in different sandboxes.
On the other hand, Protocol Stubs and Hyperties live in separate sandboxes even if they are distributed by the same Service Provider.
To preserve compatibility with existing device native runtimes, Hyperty Core Runtime components are downloaded from the Hyperty Runtime Service Provider and executed in a sandbox named Core Sandbox.
The Core Sandbox is responsible for the deployment, execution, and supervision of components downloaded from Service Providers.

Communication between components residing in different sandboxes is possible only through messages exchanged via the Message Bus component located in the Core Sandbox.
To communicate with a Service Provider, a Protocol Stub playing the role of a bridge between the Hyperty Runtime and the Service Provider, is used.
If Hyperty and Application share the same sandbox, they can communicate directly through a local API, otherwise they have to exchange messages through the Message Bus.
