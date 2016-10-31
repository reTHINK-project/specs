#### Discover Hyperty

The Runtime procedures to Discover available Hyperties. Check Messages Specification [here](../../specs/messages/registration-messages.md#hyperty-instance-query-per-user)

![Figure @runtime-disocver-hyperty: discover Hyperty](discover-hyperty.png)

Hyperty discovery is performed through the Runtime Registry which returns the Hyperty Registry entry (**phase 2 new!!**) containing its Hyperty Runtime URL, the P2P Handler Stub instance URL and the catalogue URL of P2P Requester Stub. It should be possible to rule this discovery according to policies enforced in the MN ie the user should be able to control who is able to have access to its P2P connections. The Runtime Registry saves the returned Hyperty Registry entry.
