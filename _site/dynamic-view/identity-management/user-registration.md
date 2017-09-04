#### User Identity Registration

This section, describes the main procedures for the registration of a new Identity in the Hyperty Runtime. It is assumed that an account was already created by the user on the IdP through an out of scope mechanism.

![Figure @runtime-ident-man-user-registration: User registration](user-registration.png)

Steps 1: the App request the RuntimeUA to register the new Identity, providing the IdP URL and the user ID Token.

Steps 2-3: The RuntimeUA [deploys the IdP Proxy protocol stub](../basics/deploy-protostub.md)(see section 4.3.3.2) required to support the connection with back-end IdP server.

Steps 4-7: the RuntimeUA requests the IdModule to register a new Identity. The IdModule requests the Service Provider back-end IdM to authorise the new Identity creation by sending a message through IdP Proxy Protocol Stub.

Steps 8 - 9: optionally, the back-end IdM requests the user to authenticate and authorise the new identity set in the Runtime via a separated channel (e.g. SMS)

Steps 10 - 13: assuming the identity set in the runtime is successfully authorised, the IdM back-end service returns a set of tokens, which are stored by the IdModule.
