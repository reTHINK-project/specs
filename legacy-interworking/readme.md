WORK IN PROGRESS...

## Interworking with Legacy Services

###Introduction
ReTHINK frameworks provides a mechanism to interact with legacy networks. This allows for example, to send calls to an IMS system from a Hyperty running in a browser, or exchanging Slack messages from a Hyperty. The elements involved is the same in the previous examples. Both of them require the implementation of an InterWorking protostub - the "IWStub" - which will interact with the legacy service. The protostubs also have to be created to interact with different Message Nodes so it does not add any relevant change to reTHINK architecture. It is also necessary to associate the Hyperty to more than one Identity, at least one identity used by the application which uses the Hyperty and also an identity valid for the Legacy domain. Both identities could be the same, however this would not be a common case.

###Applications
This integration with existing services . This is a critical requirement in order to make possible a soft migration between the existing services to reTHINK by making reTHINK application interoperable with potentially any service.

One of applications which comes to mind for operator environment is to integrate reTHINK with existing telephony networks. Being able to make and receive calls, and use other advanced services provided by operator's IMS allow to open the operator services in a flexible and secure way to all the devices and platforms where reTHINK runtime can be executed.

The same is applicable to other popular services such as Facebook, Slack, Salesforce and any other social network or messaging system which expose public APIs. For example, this interworking mechanism will allow to build an application which can receive calls from IMS in the public Identity of the user (normally an e.164 number) and also to send and receive slack messages in the same web interface. These features can be combined with any reTHINK-based service.


###Interworking strategy proposal

The IWStub must be provided by the legacy domain and it must make ReTHINK interoperable with the API or GW deployed in the legacy service to expose service to third parties. For example, in the case of IMS the IWstub must implement the protocol needed to interact with gateway element which translates a web-based signaling protocol and WebRTC media profile in SIP and media profiles compatible with IMS.

The diagram below shows the architeture of the integration of reTHINK with an external service.

*todo: in the picture below replace "SIPoWS messages" by "Legacy Domain Protocol"*

![alt text](rethink-Legacy-Integration-approach2.png "Legacy domain interworking diagram")

> to define here what is a IWStub ie a protostub that implements the protocol supported by the legacy domain as well as  it implements IDP Proxy functions if the legacy domain protocol is also used for IdM eg Login. Also mention that ideally the IWStun is downloaded from the legacy domain itself. Otherwise the fallback is to be loaded from the default domain (the same way we implement idp-proxy in place of Google for instance).


A stated in the introduction the Hyperty will need to be associated to two identities. The Identity Module will handle the authentication against the Identity Provider of the Legacy domain. After a successful authentication normally a token will be provided. This token has to be used from the Protostub to authenticate itself during the registration/login process to the legacy domain. Depending on the Legacy Domain this process may be different, however the case we are describing here should be compatible with the most scenarios.

Once the Identity Module has finished the authentication process, the Hyperty is ready to instruct the Protostub to register into the legacy domain and start the exchange of messages in order to give service to the application using the Hyperty.

The Hyperty will be able to interact with the legacy domain sending messages to the Protostub as it is done for a regular Message Node. The same way the Hyperty will be able to receive messages from it. The messages received by the Protostub from the legacy domain will also be translated into reTHINK messages (which are described  [here](../messages/legacy-interworking-messages.md)).

###Technical implementation
A dynamic view should be provided [here](../dynamic-view/legacy-interworking/readme.md) with MSC diagrams

###IWstub implementation
The data model of the Protostub which has been used from it conception in reTHINK has been adapted to be compatible with the IWstub so in terms of data model it is like any other protostub. 
The Data model is described in this diagram:

![Protostub datamodel](https://github.com/reTHINK-project/specs/blob/master/datamodel/core/hyperty-catalogue/Protostub-Descriptor-Data-Object-Model.png)

The attributes was included to accomodate with the same data model also the IWstubs are:
- *interworking*: if this boolean is true it indicates that the protostub is used to connect with a legacy domain that is not compliant with reTHINK.
- *idpProxy*: this boolean indicates if protostub also provides Idp Proxy features. This may be needed to support interact with legacy domains.  
- *HypertyDataObjects*: It defines the HypertyDataObjects supported by peers belonging to the domain served by this protostub. To parameter may be useful to interact with a legacy domain which supports several Data Objects to implement different functionality. 

A complete list of attributes can be consulted [here.](https://github.com/reTHINK-project/specs/tree/master/datamodel/core/hyperty-catalogue)

###Token based authentication techniques
Many Internet-based services expose APIs to be accessed from third-party services. many of these APIs use token-based mechanisms to authenticate the request coming from authorized users.

[complete with real examples: Slack, Facebook]

The emergence of WebRTC support by most important browser vendors motivated 3GPP to defined token-based strategies to access the IMS network from Web applications. This will allow to use potentially any web browser with WebRTc support to behave as a user Equipment which has been restricted to native SIP clients. In the case of IMS, the authentication provider enabled by the operator (which can be the operator itself) provides a registration token after a correct login. This token based authentication has been designed to open IMS services to Web browser. reTHINK will leverage this token-based authentication feature.  


###IMS interworking
3GPP has released a [draft specification 24.371](https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=1087) to define WebRTC access to IMS systems. The proposed legacy interconnection scheme for reTHINK is compliant with this specification and it will be shown in T.6.3.

The diagram below shows the interconnection diagram which is very similar to the generic one previusly shown. The IMS gateway will perform a validation of the token obtained from the Identity provider and it will be passed to the gateway element of the IMS network in order to validate the token and registrate the identity associated to the reTHINK hyperty in the IMS network through the IMS protostub.
From this point on, the Hyperty will be able to interact with the IMS network through the protostub. From the IMS point of view the registered Hyperty is just another User Equipement. To enable voice and video calls the WebRTC gateway would perform the tranlastion between the media with WebRTC profile to a media profile compatible with the IMS network.

![alt text](rethink-IMS-Integration-approach2.png "IMS interworking diagram")

###IWstub Extensibility Considerations 
Extending ReTHINK to make it interconnectable with different services which make require to support scenarios and use cases which has not been considered at design time. So 

For example, to implement complex message flows, for example, the SIP call flow needed to implement call transfer, may not be implementable with the current connection Data Object so it may need to be extended in the future. That is why a the dataObjects attribute has been added to the protostub descriptor which includes all the HypertyDataObjects supported by peers belonging to the domain served by this protostub. New HypertyDataObjects may be needed to support new scenarios so the mechanism to interact with Legacy Domains is flexible enough to meet future requirements.

Additionally to the dataObjects a new boolean attribute called idpProxy has been defined to specify if the IWprotostub is also a proxy for the Identity Provider exposed by the Legacy Domain. Allowing the protostub to act as an IdPProxy gives an extra-flexibility which will help to accomodate future Identity management mechanism.


