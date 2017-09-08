---
layout: documentation
title: Identity Management Overview
category: How it Works - Identity Management
order: 0
---



ReThink identity management is based on several components that are working together:

* The Identity Module (Id Module) is a component of the runtime. It is the component responsible for handling the user identity and the association of this identity with the Hyperty instances, in order to make Hyperty instances identifiable. The identity in the reTHINK project is not fixed to a unique Identity Service Provider, but obtained through several different Identity sources. With this approach, the Id Module provides to the user the option to choose the preferred source and also method for authentication. This module has to support multiple Identity acquisition methods, e.g. OpenID Connect 1.0, Kerberos System, or authentication through smart cards. For example, a user with a Google account can use Google as an Identity Provider to provide Identity Tokens, which can be used by the Identity Module to associate him with a Hyperty instance.

* The Identity providers are key in the identity management as they are used for authentication delegation.

* The IdP-Proxy is the software module that is provided by the Identity provider in order to give a secure way to generate an identity assertion and assert it to a third party. The IdP-Proxy is based on W3C and IETF specifications of WebRTC and have been generalized in the reTHINK framework.
