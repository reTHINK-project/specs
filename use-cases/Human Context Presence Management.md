---
layout: documentation
title: Human Context Presence Management
category: Use-Cases
order: 17
---

## Actors

Alice and Bob are [Identified Consumers](../business-models/business-roles.md#identified-service-consumer) that are subscribers of different [Context Service Providers](../business-models/business-roles.md#communication-service-provider).

## Pre-conditions:

- Alice and Bob are [registered in different CSPs](../User%20Authentication%20and%20Registration.md)
- Alice knows Bob Identifier

## Description:

- Alice asks authorisation to Bob to subscribe to his Context / Presence
- Bob receives Alice's request and accepts (usually this procedure also gives permission to Bob to subscribe to Alice Context )
- Alice is informed Bob has accepted her subscription and receives current Bob context
- Every time Bob's Context change is published, Alice is notified
- Depending on the Context Service provided, Bob's Context data is the agregation of data from different sources, including:
  - availability status explicitly set by Bob
  - connectivity status derived from events received from the network
  - activity status derived from data collected from sensors
  - connectivity description eg IP Address and ports
  - device profile eg available resources including media (mic, cam), data sources (sensors) and associated codecs.
  - localisation collected from sensors
  - environmental data (eg temperature, light, noise) derived from data collected from sensors
  - etc
- every time Alice registers with her service provider, she receives the most updated context data of Bob as a response to a request that is automatically authorized by Bob's Context Provider (or a separated Authorisation / Identity Provider in case Bob has subscribed the Context Provider with an external Identity) as set with the Context subscription

## Differentiation - market relevance

Currently it is not possible, seamless interoperability between Context providers and consumers.

#64 Human Context
