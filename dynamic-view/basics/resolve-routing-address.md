#### Resolve Routing Address

This section describes how the Runtime Registry procedures to resolve a routing address during the [Message Routing process](bus-msg-routing).


![Address Resolution](resolve-routing-address.png)

Steps 1 - 2: when the Message Bus does not find listeners to deliver the message it asks the Runtime Registry to resolve the address where the message should be forwarded to. This means the `message.to` address is an external address that does not belong to the runtime and should be routed through a protocol stub.

Steps 3: Registry verifies the originator is valid i.e. its Runtime URL has been previously registered.

**Phase 2 New!**
Steps 5 - 6: the registry will give more priority for the usage of P2P Connections, thus it looks for one that is registered and connected.

Steps 7: in case no P2P Connection is registered, the Registry starts the process to request a P2P Connection through a P2P Requester Stub, by creating a new P2P Connection entry with status "connecting".

Steps 8 - 14: The first task is to discover the catalogue URL from where the P2P Requester Stub can be loaded. The runtime registry looks for the P2P Requester catalogue URL in locally stored Hyperty registry. If not found in its local cache, it queries the Runtime Registry for the Hyperty P2P Requester Stub URL, using a [Read Request Message](../../messages/registration-messages.md#hyperty-instance-query-per-hyperty-url). The

Steps 15 - 16: the P2P Requester Catalogue URL is extracted from the [registry object entry](../../datamodel/core/hyperty-registry) which is used to (deploy-protostub.md)[load and deploy the P2P Requester Protocolstub]. As soon as the P2P Requester Stub is activated it performs [the P2P Connection Setup](p2p-setup.md) and returns the runtime URL of the new P2P Stub URL to the Message Bus.

---
Steps 17 - 21 (**phase 1 resolve process**): If it is not possible to use a P2P Connection, it looks for the Message Node protostub Runtime URL to be used that is associated to the Hyperty domain. The process to [deploy the Message Node Requester Protocol Stub the runtime](deploy-protostub.md) is triggered, in case it is not available yet.

Steps 22 - 23: **Phase 2 New!** If there is a P2P Connection registered but not connected yet, this means the P2P connection has started but not finished yet. In this case we must use a MN Stub. This message could be itself part of the P2P connection signalling process. In this Steps 17 - 21 are performed ie  group "resolve MN Stub URL".
