---
layout: documentation
title: Validation of trust
category: Use-Cases
order: 15
---

Adaptive trust level at conversation runtime

## Actors:

[Communication Service Provider](../business-models/business-roles.md#communication-service-provider)

Alice is a participant of the communication. It is first anonymously connected but then authentify when requested. She has one or more IdP.

Moderator: Controls the trust level of the conversation to adapt it to the current risk/value.

Identity provider: Provides authentication mechanism with associated trust level. Provides some authentication mechanism without user interaction.

## Pre-condition

- Alice is [subcriber to an IdP](../User%20Authentication%20and%20Registration.md).

## Description:

During an audio-video conversation (e.g. audio conference) users can ask to modify the level of trust between participants in order to discuss more serious matter.
This procedure would involve trust negotiation between users (p2p) or with a relay (depending on the WebRTC multicast topology https://tools.ietf.org/html/rfc5117)
This procedure must aim for minimal level of user interactions in order to reduce cost.
The primary use case is to raise trust in users’ identity but it could also be about trust in users’ reliability or competences.

1. Alice display a page of a service to make a simulation (e.g. a bank loan). She is contacted online by an advisor, anonymously.
2. As she wants to go further in the negociation, the advisor ask her to disclose her identity to propose more information.

## Differentiation - market relevance

#27 Trusted context
