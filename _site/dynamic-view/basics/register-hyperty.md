#### Register Hyperty

The Runtime procedures to register a new Hyperty are described in this section.


![Figure @runtime-register-hyperty: Register Hyperty](register-hyperty.png)

**Phase 2 New! The Hyperty Address Allocation is now performed by Runtime UA before this step**

Step 1: the Hyperty registration is requested by the Runtime UA triggered by the [Hyperty Deployment process](deploy-hyperty.md) (section ?).

Steps 2 and 3: The Hyperty is associated to a certain [identity](../identity-management/user-to-hyperty-binding.md)

Steps 4: **Phase 2 New!** check if registration is new

Steps 5 - 7: If it is a new Hyperty instance, it has to registered in the back-end Registry a ([Create Message is used](../../messages/registration-messages.md#registration-request)\). **Phase 2 New!** Registration contains new fields for Hyperty Runtime URL, its P2P Handler Stub instance URL and the catalogue URL of P2P Requester Stub.

Steps 8 - 10: **Phase 2 New!** if it is not a new registration, an existing Hyperty instance registration is updated in the back-end Registry. ([Update Message](../../messages/registration-messages.md#update-registration-to-live)\).

Steps 11 - 12: The runtime Registry adds its listener to be notified about Hyperty instance status and returns the Hyperty URL to the runtime UA
