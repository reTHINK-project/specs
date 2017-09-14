---
layout: documentation
title: Service Subscription
category: Use-Cases
order: 13
---

## Actors

[Consumer Alice](../business-models/business-roles.md#service-consumer) subscribes a service from a [Service Provider](../business-models/business-roles.md#service-provider) by using an Identity from a separated [Identity Service Provider](../business-models/business-roles.md#identity-service-provider)

## Pre-condition

- For Variant a) and b) Consumer has a valid Identity from an existing [Identity Service Provider](../business-models/business-roles.md#identity-service-provider)

## Description

1- Consumer access service provider subscription (Web) App

2- Different subscription variants:

a) subscribe a service using an existing consumer Identifier from a list of separated Identity Service Providers that have trustful relationships with service provider.

b) subscribe a service using an existing consumer Identifier from a separated Identity Service Providers that does not appear in 2.a.

c) subscribe a service without providing an existing consumer Identifier.

### Subscription Variant a) and b)


3a- User is redirected to Identity Provider (Web) App requesting permissions.

4a- User Gives Permissions

5a- User is redirected back to service provider subscription (Web) App where additional subscription data may be provided

### Subscription Variant c)

3c- user may be subject to an enrolment process eg to provide a separate communication channel that will be used by the subscription App to send a token

4c- user will receive the token via a separate communication channel and provide it to subscription App

5c-  an Identity and associated credential eg password is issued

6c- additional subscription data may be provided

## Differentiation - market relevance

basic

#84 Identity Management
