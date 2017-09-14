---
layout: documentation
title: H2H Conversation with QoS
category: Use-Cases
order: 8
---

## Actors

[Communication Service Provider](../business-models/business-roles.md#communication-service-provider), which sells bridges to pro-conf calls.

Alice is [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that is a [Conversation Participant](../business-models/business-roles.md#conversation--communication-participant) of the conf call.

Bob is [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that is a [Conversation Participant](../business-models/business-roles.md#conversation--communication-participant) of the conf call.

## Pre-condition

- Alice and Bob are [subscribers in the CSP](../User%20Authentication%20and%20Registration.md) and rely it.
- Alice and Bob have a rendez vous on this conf call bridge.
- Alice and Bob are authenticated to the CSP
- Alice and Bob are authorized by their CSP

## Description

Users registered in the same **CSP** domain are able to setup a Audio and Video Conversation.
1. Alice selects the conf call number and connects to it and initiates an audio-/video conversation.
2. Bob selects the conf call number and connects to it and initiates an audio-/video conversation.
3. Both Alice and Bob can see the remote and local video on their screen and hear the remote voices. The QoS is guaranteed by the service provider.
4. When they are finished any party can hang up and the converation is closed; the remote video and audio stops.

## Differentiation - market relevance

For a professionnal service, we ensure that the audio/video flow will be stable and of high quality.

#67 H2H Communication UC, Network Connectivity
