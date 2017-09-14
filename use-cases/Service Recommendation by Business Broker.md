---
layout: documentation
title: Service Recommendation by Business Broker
category: Use-Cases
order: 18
---

## Actors

Alice is a [Identified Consumers](../business-models/business-roles.md#identified-service-consumer) that is subscribed to a [Business Broker](../business-models/business-roles.md#business-broker).

A new Service Offer (Product) is published by a [Service Provider](../business-models/business-roles.md#service-provider) to the Business Broker.

## Pre-condition

- Alice is [registered](../User%20Authentication%20and%20Registration.md) with the Business Broker
- Service Provider is a Business Broker partner

## Description

- Alice authorizes Business Broker to collect Alice service usage data and to use it to build Alice Profile
- According to Alice Business Brokering subscription policies, there is the option that Alice profile is managed and owned by her. This means, Alice is free:
  - to change her profile (create, update, delete);
  - to export it to other Business Broker in case she decides to move on to other business brokering provider
- Service Providers should be able to publish Service Offers / Products and its associated metadata description to any Business Broker. (_idea to be further studied: service provider announces new offers to a topic that anyone including Business Brokers can listen to. Creation of new announcement topics can be dynamically discovered by Business Brokers by using mechanisms like web bots_)
- Business Broker should be able to certify the quality of service provider offer before it is published into its product catalog
- Business Broker matches the new product with Alice profile and provides her a recommendation to use / subscribe the new service offer / product.

### Variant

- Alice can consult and subscribe services from Business Broker catalog (a la App Marketplace)
- Service Recommendation can be triggered when Alice Profile is updated

### Business Models

- The Business Broker receives a fee per recommendation and/or service subscribed, from the recommended service provider.
- Depending on the Service Provider Business Model, the Business Broker mediates payment transactions between consumers and service providers receiving a percentage of such transaction or a flat fee
- Business Broker may create bundles of its own Core Products with complementary products of service provider partners. Depending on the Bundle business model, Business Broker may provide the complementary product for free (or near to) and pay a sustainable amount of money to its partners.

## Differentiation - market relevance

Not possible today, since currently product catalogs are proprietary.

#91 Charging and Billing
