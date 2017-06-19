## Description of Component
The identity management is based on several components that are working together:
* The Identity Module (Id Module) is a component of the runtime. It is the component responsible for handling the user identity and the association of this identity with the Hyperty instances, in order to make Hyperty instances identifiable. The identity in the reTHINK project is not fixed to a unique Identity Service Provider, but obtained through several different Identity sources. With this approach, the Id Module provides to the user the option to choose the preferred method for authentication. This module will thus able to support multiple Identity acquisition methods, such as OpenID Connect 1.0, Kerberos System, or authentication through smart cards. For example, a user with a Google account can use the Google as an Identity Provider to provide Identity Tokens, which can be used by the Identity Module to associate it with a Hyperty instance.
* The Identity providers are key in the identity management as they are used for identity authentication delegation
* The IdP proxy is the software module that is provided by the Identity provider in order to give a secure way to assert an Identity to a third party. The IdPProxy is based ont the W3C and IETF specifications of WebRTC and have been generalized in the reThink framework.

## Principle
The identity management is based on the paradigm of a multi-IDP multi-service architecture, stating that we have interoperability between services. In legacy communication services (ie Telco), trust is considered as a basis because the service provider is also identity provider, and interconnection between networks are supposed secured. Here, the game is different because a user is supposed to trust his browser (as a secured execution element), the IdP he has chosen, and probably his service provider. But there is no way to ensure that the user you want to reach uses a trustfull service and identity provider.
For example, if Bob is using service A, he wants to reach Alice on service B, if there is an interconnection between A and B, how can bob be sure that Alice is the right person to reach?
To add security, the W3C and IETF provides a IdPProxy mechanism, that allow Alice and Bob to deliver an identity assertion, that is provided to the other party. This Identity assertion is coded, and uncoded directly by the Identity provider. Thus, the service does not interfere in the security. Finally, the Identity Assertion contains the public key that is used by the DTLS handshake during the WebRTC connecion setup, ensuring that authenticated person is the one that has a pear connection. This avoids man in the middle.

## Use cases


## Implementation

## Future work
