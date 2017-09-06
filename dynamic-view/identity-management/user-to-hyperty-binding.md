---
layout: documentation
title: Identity Binding
category: How it Works - Identity Management
order: 1
---

![Figure @runtime-ident-man-user-to-hyperty-binding-scheme: Associate User Identity to Hyperty Instance](user-to-hyperty-binding-scheme.png)

This sequence details the steps needed to associate the user identity to a given Hyperty instance. These steps are usually triggered by the [Hyperty Registration](../basics/register-hyperty.md) procedure but can be triggered anytime it is decided to change the Identity.

Steps 1-3: During the [Hyperty Registration](../basics/register-hyperty.md) process, triggered by the Runtime User Agent, the Runtime Registry request the Identity Module for all available identities that can be associated to the Hyperty Instance.

Steps 4-5: optionally, the RuntimeUA requests the Policy Engine to authorise the User Identity association.

Steps 6-7: in case there is more than one possible Identity, Alice can be asked to select one (should this step be performed by the IdModule?)

Steps 8-10: the RuntimeUA requests the Identity Module, which replies with the identity token (ID Token) for the selected user. This step assumes that an identity Token has already exists for the requested user. If it does not, a new Identity Token has to be generated.

Steps 11- The RuntimeUA requests the Registry to bind the selected ID Token to the Hyperty Instance. The HypertyURL works like an Association ID which will allow the Runtime Core to sign messages sent by the Hyperty instance with its associated ID Token.
