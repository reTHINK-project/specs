---
layout: documentation
title: M2M Always Connected in Trustful Domains for Multi vendor devices
category: Use-Cases
order: 16
---

## Actors

Alice is a [Identified Consumer](../business-models/business-roles.md#identified-service-consumer) that purchased a new device from a certain Device Manufacturer (new Business Role?) which is different from the existing installed devices.

## Pre-conditions:

Device is configured by the manufacturer to automatically register, discover and connect to certain types of devices belonging to the same domain.

## Description

1- As soon as the device is turned on and connected to the network, it will register in the domain (e.g. residential or enterprise gateway).

2- Device automatically discovers other devices to connect with or to subscribe to certain events.

3- Device connects to other devices to request data, publish data or to subscribe to certain events \ data.

Example: new washing machine is connected and discovers the HEMS (Home Energy Management System) system, subscribes to receive events about its level of voltage notifications.

### Variation

1- As soon as the device is turned on and connected to the network, it will register in the domain (e.g. residential or enterprise gateway).

2- Other devices are notified about the new registered device.

3- Other Devices connects to new device to request data, publish data or to subscribe to certain events \ data.

## Differentiation – market relevance

Currently, there is no standard mechanism to enable p2p adhoc connections between "smart devices". This is a market with a huge potential namely HEMS (check  http://www.greentechmedia.com/research/report/home-energy-management-systems-2013-2017).

#5 M2M Communication UC
