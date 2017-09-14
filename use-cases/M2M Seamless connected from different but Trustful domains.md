---
layout: documentation
title: M2M Seamless connected from different but Trustful domains
category: Use-Cases
order: 14
---

## Actors

Alice and Bob manages a set of devices from different vendors.

Note: Alice and Bob can be organisations or individuals.

## Pre-conditions:

[Devices are registered with their domains](../M2M%20Always%20Connected%20in%20Trustful%20Domains%20for%20Multi%20vendor%20devices.md).

The domains have a strong trustful relationship implicitly or explicitly set (we should have a separated Use Case to describe how trust between domains can be set)

## Description

1- Bob's device discovers Alice's device and asks permission to connect to it.

2- Trust between Alice and Bob domain is evaluated.

3- In case Trust is high, permission is given.

4- Bob's device connects with Alice's device.

Example: Public Health Care Service: Individual wearable devices are seamless connected to public healthcare devices.

## Differentiation – market relevance

Currently, there is no standard mechanism to enable p2p adhoc connections between "smart devices".

![m2m seamless connected with trustful domains](https://cloud.githubusercontent.com/assets/3893553/6000435/bb27c2e4-aad5-11e4-9efb-0c33699b3667.png)

#6 M2M Communication UC and Trusted Context
