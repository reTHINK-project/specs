---
layout: documentation
title: User Authentication and Registration
category: Use-Cases
order: 12
---

## Actors

Consumer Alice is [Identified](../business-models/business-roles.md#identified-service-consumer) by a [Service Provider](../business-models/business-roles.md#service-provider)

## Pre-condition

- Alice has [a valid credentials / account provided by the Service Provider](../Service%20Subscription.md)

## Description

Alice uses her App or browser to authenticate against the Service provider. After a successful authentication, relevant information for the service delivery about the device (e.g. capabilities) and surrounded context (e.g. user presence) is published.
The registration session in the service is valid until the App, browser, the browser tab is closed or explicitly unregisters from the service e.g., by clicking in a “Exit” button.

### Variant

Consumer Alice uses an Identity from a [Identity Service Provider](../business-models/business-roles.md#identity-service-provider) to register and authenticate against a different [Service Provider](../business-models/business-roles.md#service-provider)

## Pos-condition

## Differentiation - market relevance

basic

#81 Identity Management
