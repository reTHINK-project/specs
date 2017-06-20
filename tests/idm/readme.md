## Description of Component
The identity management is based on several components that are working together:
* The Identity Module (Id Module) is a component of the runtime. It is the component responsible for handling the user identity and the association of this identity with the Hyperty instances, in order to make Hyperty instances identifiable. The identity in the reTHINK project is not fixed to a unique Identity Service Provider, but obtained through several different Identity sources. With this approach, the Id Module provides to the user the option to choose the preferred method for authentication. This module will thus able to support multiple Identity acquisition methods, such as OpenID Connect 1.0, Kerberos System, or authentication through smart cards. For example, a user with a Google account can use the Google as an Identity Provider to provide Identity Tokens, which can be used by the Identity Module to associate it with a Hyperty instance.
* The Identity providers are key in the identity management as they are used for identity authentication delegation
* The IdP proxy is the software module that is provided by the Identity provider in order to give a secure way to assert an Identity to a third party. The IdPProxy is based ont the W3C and IETF specifications of WebRTC and have been generalized in the reThink framework.

## Principle
The identity management is based on the paradigm of a multi-IDP multi-service architecture, stating that we have interoperability between services. In legacy communication services (ie Telco), trust is considered as a basis because the service provider is also identity provider, and interconnection between networks are supposed secured. Here, the game is different because a user is supposed to trust his browser (as a secured execution element), the IdP he has chosen, and probably his service provider. But there is no way to ensure that the user you want to reach uses a trustfull service and identity provider.
For example, if Bob is using service A, he wants to reach Alice on service B, if there is an interconnection between A and B, how can bob be sure that Alice is the right person to reach?
To add security, the W3C and IETF provides a IdPProxy mechanism, that allow Alice and Bob to deliver an identity assertion, that is provided to the other party. This Identity assertion is coded, and uncoded directly by the Identity provider. Thus, the service does not interfere in the security. Finally, the Identity Assertion contains the public key that is used by the DTLS handshake during the WebRTC connecion setup, ensuring that authenticated person is the one that has a peer connection. This avoids man in the middle.

## Use cases
The main use case in communication is ensuring that the peer is the one he pretends to be. Of course this can be generalized in the communication with objects, with some trustful authentication services.
If the user connects to a service, he logs in with his/her IdP, he reaches a peer. To assert his/her identity, he gets an assertion from the IdP, thanks to the IdPProxy. In case that the IdP is not implementing it, the communication can still be setup, but it will not be considered as secured. This mechanism could be compared to an HTTPS connection with a self signed certificate: you can be ok at your own risks.

## Implementations
Two implementations have been provided during the reThink project.

### IDModule
The first implementation is the one embedded in the reThink core runtime, called IdModule. The IdModule considered the implementation of the IdPProxy as mandatory. As no actual IdP implements yet this specification, the IdP proxy has been implemented and deployed in the catalogue of the reThink service. This is of course for demonstration purpose, as the Service Provider is not considered as a secured entity, and thus cannot assert an Identity on behalf of the Identity Provider. But this implementation works with Google Connect.

### Browser extension
A second implementation of the Identity Module is based on the browser extension. It supposes that the browser is responsible to manage user identity, and uses the IdPProxy as a proof of authentication for the browser. Here again, as no actual IdP provides the idp proxy, we have developped two implementations of the IdPProxy with OpenID Connect protocoles. The difference of this implementation is decoupled from the core framework, and thus can be used by the application, regardless of the use of the framework or not, stating that even if no hyperty is loaded, the user is usually authenticated in the service.

## Future work
As described above, we provided two approach of the identity management, that are complementary. It was not possible to integrate both due to lack of time.
For future integration, runtime ID module must implement an API that can take an ID hint as an input. Currently, there is no possibility for the application to give this hint to the core runtime ID Module. The consequence is that the application cannot controle the identity used by the hyperties, and as the runtimes needs an authentication, there is a double authentication which is a terrible user experience.
Antother important point is the possibility to add negociation between peers, to allow IdP restriction and security level to a conversation. This feature is describe in [Kevin paper] has not been implemented.




