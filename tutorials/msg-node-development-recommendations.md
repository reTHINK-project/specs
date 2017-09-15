---
layout: documentation
title: How to develop Message Nodes
category: Getting Started
order: 8
---


For a general overview and to support initial design decisions for a new implementation of a Message Node, please have a look at [Message Node and Protostubs design recommendations](../../messaging-framework/msg-node-design.md).

This doc summarizes the results and the "lessons learned" from the different reference implementations of Message Nodes so far. One important lesson is:

**The Message Nodes play a crucial role for the stability, robustness and the experienced performance of applications developed on top of the rethink infrastructure.**

This is because the Message Nodes are the central gateway to access resources of a service providers domain. They are responsible for the allocation of addresses, for the interworking with the domain registry to register and search hyperties and objects and they route messages between such entities.

## Where to find the relevant specification

The best place to start with is the description of
[Functional Architecture](../../messaging-framework/readme/) as a high level intro.

The specification of messages that are handled by the Message Node are defined [here](../../messages/readme/). However, this documentation includes all kind of messages, i.e. also messages that are not relevant for the MN itself, because they are Runtime internal and therefore never reach the MN.

Therefore - as a common rule - the focus should be on messages sent to "domain://...". This prefix is an indication that the MN is responsible for the handling of the message via one of its support services or a connector. All other messages that will reach the MN must be routed according to `to` address.

You should start with the [address-allocation-messages](../../messages/address-allocation-messages), then continue with the [registration-messages](../../messages/registration-messages) and go on with the [data-sync-messages](../../messages/data-sync-messages). These are the mandatory parts to make a MN work with most of the provided examples.

## Test cases

In order to ensure that a MN will work as it should, there is a set of test cases available at [here](../../messages/data-sync-messages). A Quickstart documentation and additional information is provided there and is out of scope here.

These testcases are focussing on the conformance with the message specification and on performance measurements. Tests for the robustness of the MNs, i.e. against malformed requests etc. are not yet in focus.

## Performance hints

As mentioned before, the MN plays a central role for the experienced/felt performance of applicatons running on top of the rethink framework. Therefore it is important to achieve a high performance for the allocation of addresses and especially for the routing of messages.

For the routing performance there are two main factors of importance:

1. the communication protocol between the Protocol stub and the MN
2. the MN internal routing mechanism

The experience with the different reference implementation has proved that WebSockets, for instance, are a suitable and very well performing mechanism to connect the stubs with the MNs. They also have the advantage that they indicate a loss of connectivity, which can be used by the MN to manage internal resources accordingly.

For the MN internal routing the experiences with Matrix as a core system have shown that HTTP/HTTPs based message transfer is not performing well enough for a number of use-cases. The protocol overhead and the required number of round trip times are to high. This experience also indicates that HTTP based traffic shall not be the preferred way to connect stubs and MNs.
