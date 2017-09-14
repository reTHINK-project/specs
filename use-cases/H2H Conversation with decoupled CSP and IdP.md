---
layout: documentation
title: H2H Conversation with decoupled CSP and IdP
category: Use-Cases
order: 4
---

## Actors

Alice is [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that is a [Conversation Participant](../business-models/business-roles.md#conversation--communication-participant)

Bob is [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that is a [Conversation Participant](../business-models/business-roles.md#conversation--communication-participant)

Alice and Bob are subscribers of the same [Communication Service Provider](../business-models/business-roles.md#communication-service-provider) but each one use identities managed by different [Identity Service Providers](../business-models/business-roles.md#identity-service-provider)

## Pre-conditions:

- #83 Alice and Bob are registered in the same CSP using external identities provided by different IdPs. It would also be possible to have one of the peers using "native" identifiers from the CSP and the other peer using external identifiers .
- Alice knows Bob identifier, which is provided by an external IdP
- remark: The following needs to be defined in a use case within the identity domain!!!!
  Each participant is certified about the identity of remote participants by using assertions managed by an external Identity Service Provider.

## Description

Similar to [H2H Conversation with single CSP](../H2H%20Conversation%20with%20single%20CSP.md).

## Differentiation – market relevance

Market relevant but not currently available.

#3 H2H Communication UC and Identity Management
