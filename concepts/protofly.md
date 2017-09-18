---
layout: documentation
title: Protocol on-the-fly
category: Concepts
order: 5
---

## Protocol on-the-fly (protofly) and Protostubs

Protocol on-the-fly ensures messaging protocol interoperability between any distributed software Services without having to standardize protocols.

Protocol on-the-fly leverages the code on-demand support by Web runtimes (Javascript), to dynamically select, load and instantiate the most appropriate protocol stack during run-time.
This feature enables protocols to be selected at run-time and not at design time, which brings several benefits, namely: enables protocol interoperability among distributed Services, promotes loosely coupled Service architectures, makes platform updates much easier, and minimizes standardization efforts and optimizing resources spent.
These benefits stem from the fact that Protocol Gateways can be avoided in Services' middleware.
The implementation of the protocol stack (e.g. as a JavaScript file) which is dynamically loaded and instantiated at run-time is called a **ProtoStub**.
For security reasons, Protostubs are executed in isolated sandboxes and are only reachable through the Runtime MessageBUS and the Protostub Sandbox MiniBUS.


![Protocol on-the-fly and Protostubs](../img/concepts/protofly.jpg)

## Interworking Stubs

reTHINK framework provides a mechanism to interact with legacy networks. This allows, for example, to setup calls with an IMS system from a Hyperty running in a browser, or exchanging Slack messages from a Hyperty. These scenarios are realized through the implementation of an InterWorking protostub - the "_IWStub_" - which will interact with the legacy service. Since protostubs also have to be created to interact with different Message Nodes, it does not add any relevant changes to reTHINK architecture. It may be also necessary to associate the Hyperty to more than one Identity, at least one identity used by the application which uses the Hyperty and also an identity valid for the Legacy domain. Both identities could be the same, however this would not be a common case.

### Who provides the IWstub?

The IWStub should be provided by the legacy domain and it must make reTHINK interoperable with the API or GW deployed in the legacy service to expose service to third parties. For example, in the case of IMS the IWstub must implement the protocol needed to interact with gateway element which translates web-based signaling protocol and WebRTC media profile in SIP and media profiles compatible with IMS.

Ideally the IWstub should also be downloaded from a back-end service of the Legacy Domain. If the Legacy Domain does not allow to download it, then it could be loaded from the default domain.

The diagram below shows a high level architecture of the integration of reTHINK with an legacy service by using a IWStub.

![Legacy domain interworking diagram](../../img/concepts/rethink-Legacy-Integration-Interworking.png)
