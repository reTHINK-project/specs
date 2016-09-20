WORK IN PROGRESS...

## Interworking with Legacy Services

###Introduction
ReTHINK frameworks provides a mechanism to interact with legacy networks. This allows for example, to send calls to an IMS system from a Hyperty running in a browser, or exchanging Slack messages from a Hyperty. The elements involved is the same in the previous examples. Both of them require the implementation of a protostub which will interact with the legacy service. The protostubs also have to be created to interact with different Message Nodes so it does not add any relevant change to reTHINK architecture. It is also necessary to associate the Hyperty to more than one Identity, at least one identity used by the application which uses the Hyperty and also an identity valid for the Legacy domain. Both identities could be the same, however this would not be a common case.




###Interworking proposal

The diagram below shows the architeture of the integration of reTHINK with an external service (Slack, in this specific case).


###

###Token based authentication techniques
Many Internet-based services expose APIs to be accessed from third-party services. Facebook and Slack are examples of services which can be interacted via APIs.  

The 3GPP has also defined token-based strategies to access the IMS network from WebRTC services. in this case, the authentication provider of the operator provides a registration token after a correct login. 


###IMS interworking

![alt text](rethink-IMS-Integration-approach2.png "IMS interworking diagram")



*to provide here related specification to support interworking with legacy services defining architectural functionalities and concepts involved. A dynamic view should be provided [here](../dynamic-view/legacy-interworking/readme.md) with MSC diagrams and the specification of messages would be provided [here](../messages/legacy-interworking-messages.md)*
