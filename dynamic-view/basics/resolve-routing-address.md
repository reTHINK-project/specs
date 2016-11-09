#### Resolve Routing Address

This section describes how the Runtime Registry procedures to resolve a routing address during the [Message Routing process](bus-msg-routing).


![Address Resolution](resolve-routing-address.png)

Steps 1 - 2: when the Message Bus does not find listeners to deliver the message it asks the Runtime Registry to resolve the address where the message should be forwarded to. This means the `message.to` address is an external address that does not belong to the runtime and should be routed through a protocol stub.

Steps 3: Registry verifies the originator is valid i.e. its Runtime URL has been previously registered.


**Phase 2 New!** Steps 5 - 6: the registry will give more priority for the usage of P2P Connections, thus it looks for one that is registered and connected.

**Phase 2 New!** Steps 7 : in case no P2P Connection is registered, `message.body.p2p` field is processed to see if the message is explicitly set to use a P2P Connection.

  **Phase 2 New!** Steps 8 - 15: If yes, the Registry starts the process to request a P2P Connection through a P2P Requester Stub, by creating a new P2P Connection entry with status "connecting". Each P2P Connection entry should contain the remote runtime URL, executing Hyperty URLs and reporting data object URLs. The first task is to discover the catalogue URL from where the P2P Requester Stub can be loaded. The runtime registry looks for the P2P Requester catalogue URL in locally stored Hyperty registry. If not found in its local cache, it queries the Runtime Registry for the Hyperty P2P Requester Stub URL, using a [Read Request Message](../../messages/registration-messages.md#hyperty-instance-query-per-hyperty-url). The

  **Phase 2 New!** Steps 16 - 17: the P2P Requester Catalogue URL is extracted from the [registry object entry](../../datamodel/core/hyperty-registry) which is used to [deploy-protostub.md](load and deploy the P2P Requester Protocolstub). As soon as the P2P Requester Stub is activated it performs [the P2P Connection Setup](p2p-setup.md) and returns the runtime URL of the new P2P Stub URL to the Message Bus.

  **Phase 2 New!** Steps 18: If it is not possible to use a P2P Connection, the process to [resolve the Message Node protostub Runtime URL ](resolve-msg-node-address.md) is performed.

**Phase 2 New!** Steps 19: If `message.body.p2p = false` or if `message.body.p2p` field does not exist, the process to [resolve the Message Node protostub Runtime URL ](resolve-msg-node-address.md) is performed.

**Phase 2 New!** Steps 20: If there is a P2P Connection registered but not connected yet, this means the P2P connection has started but not finished yet. In this case we must use a MN Stub, the process to [resolve the Message Node protostub Runtime URL ](resolve-msg-node-address.md) is performed. This message could be itself part of the P2P connection signalling process.
