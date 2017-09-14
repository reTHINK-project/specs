---
layout: documentation
title: Dynamic Media Server or Media Gateway provisioning
category: Use-Cases
order: 6
---

## Actors

Alice and Bob are [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that are [Conversation Participants](../business-models/business-roles.md#conversation--communication-participant)

Alice and Bob are subscribers of different and incompatible [Communication Service Providers](../business-models/business-roles.md#communication-service-provider)  e.g. WebRTC based and PSTN telephony.

**Inter** is a [Communication Service Provider](../business-models/business-roles.md#communication-service-provider) providing different Telephony Gateway services.

## Pre-conditions:

- Alice and Bob are [registered in different CSP](..s/User%20Authentication%20and%20Registration.md).
- Alice knows Bob identifier
- **Inter** service is discoverable
- Alice's CSP is able to pay **Inter** for its communication interoperability services

## Description

Similar to [H2H Conversation with single CSP](../H2H%20Conversation%20with%20single%20CSP.md) but in this case each participant uses different NSPs that implies the usage of a Media Gateway service,

1- Alice pushes the button to invite Bob for an audio/video conversation.
2- Different Interoperability Services with a summary of price and quality are recommended to Alice
3- Alice selects **Inter** service, the call is notified to Bob and accepted by him.

Remaining procedures are similar to [H2H Conversation with single CSP](../H2H%20Conversation%20with%20single%20CSP.md).

### Media Server Variant

The same approach can be followed for other network side Communication services e.g. MCU services to support large Multiparty Conversations.

## Differentiation – market relevance

Currently, not possible.

![Uploading Dynamic NE Provisioning.png . . .]()

#13 H2H Communication UC
