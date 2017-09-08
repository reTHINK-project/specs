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
