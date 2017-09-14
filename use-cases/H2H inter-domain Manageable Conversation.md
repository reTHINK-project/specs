---
layout: documentation
title: H2H inter-domain Manageable Conversation
category: Use-Cases
order: 3
---

## Actors

Alice and Bob are [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that are [Conversation Participants](../business-models/business-roles.md#conversation--communication-participant)

Alice and Bob are subscribers of different [Communication Service Providers](../business-models/business-roles.md#communication-service-provider).

## Pre-conditions

- Alice and Bob are using different CSPs, but are [registered](../User%20Authentication%20and%20Registration.md) (authenticated, authorized) at the IdP of their CSP.

- Alice knows Bob identifier

## Description

Similar to [H2H Conversation with single CSP](../H2H%20Conversation%20with%20single%20CSP.md) but in this case Alice and Bob are subscribed to different CSPs. They are using the corresponding service behavior - user interface of their CSP (e.g. Alice conversation user experience is set by its service provider).

## Differentiation - Market Relevance

Not currently possible with Web Communications. Essential to achieve seamless interoperabilty between any user without having the need to use more than one conversational App.

Remark: The above mentioned description is one option, in which each user keeps their original user experience. There is also the possibility that only one user experience is provided, this would mean that e.g. that Alice (who initiates the call) user experience is ported to Bob, once he accepts the call.   

#2 H2H Communication UC
