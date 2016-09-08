#### Message Routing in Message BUS

The Runtime procedures to route a message by the Runtime BUS are described in this section.

![Figure @runtime-bus-msg-routing: Message Routing in Message BUS](bus-msg-routing.png)

Steps 1 - 13: on receiving a message, the Runtime BUS requests the Registry to verify if the originator is valid (3) (i.e. its Runtime URL has been previously registered) and checks if the target address is external to the Runtime.

 * (**Phase 2 New!**) If yes, it looks for the P2P protostub Runtime URL to be used. The process to [deploy the P2P Requester Protocol Stub in the runtime](deploy-protostub.md) is triggered, in case it is not available yet. In this case, the runtime registry looks for the P2P Requester catalogue URL in locally stored Hyperty registry. Otherwise, it would query the Runtime Registry for the Hyperty P2P Requester Stub URL (5 to 12) using a [Read Request Message](../../messages/registration-messages.md#hyperty-instance-query-per-hyperty-url).

  * If it is not possible to use a P2P Connection, it looks for the Message Node protostub Runtime URL to be used that is associated to the Hyperty domain. The process to [deploy the Message Node Requester Protocol Stub the runtime](deploy-protostub.md) is triggered, in case it is not available yet.

Steps 14 - 15: in case the message requires authorisation, the Core PDP applies applicable policies to authorise its routing.

Steps 16 - 20: The Core Policy Enforcer enforces authorisation policies (including generation of Assertions or verification of assertions) in case the Runtime PDP requests it. In case policy enforcement is performed successfully, routing authorisation is requested again (step 6).

Step 21: the application of authorisation policies by the PDP can result in different types of final errors including:

-	target does not exist
-	Hyperty instance that is sending the message is not associated with an appropriate Identity
-	the message is blocked by a source or target policy
