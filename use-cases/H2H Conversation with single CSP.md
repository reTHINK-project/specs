---
layout: documentation
title: H2H Conversation with single CSP
category: Use-Cases
order: 2
---

## Actors

[Communication Service Provider](../business-models/business-roles.md#communication-service-provider)

Alice is [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that is a [Conversation Participant](../business-models/business-roles.md#conversation--communication-participant)

Bob is [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that is a [Conversation Participant](../business-models/business-roles.md#conversation--communication-participant)

## Pre-condition

- Alice and Bob are [registered in the same CSP](../User%20Authentication%20and%20Registration.md)

- Alice knows Bobs' Identifier, e.g. their is an addressbook similar directory or a look up directory service

- Alice and Bob are authenticated to the CSP

- Alice and Bob are authorized by their CSP

## Description

Users registered in the same **CSP** domain are able to setup a Audio and Video Conversation.

1- Alice selects Bob from her directory service (e.g. addressbook) and initiates an audio-/video conversation by using Bob's Identifier.

2- The call is notified to Bob and accepted by him. Both identities are assured.

3- Both Alice and Bob can see the remote and local video on their screen and hear the remote voices.

4- When they are finished any party can hang up and the conversation is closed; the remote video and audio stops.

### Variants

- UC  is similar but considers [inter-domain conversations](../H2H%20inter-domain%20Manageable%20Conversation.md).

- Conversation can be triggered by contextual data e.g. Emergency Service contact users in case of an alert from an specific sensor.

## Differentiation - market relevance

basic

#1 H2H Communication UC
