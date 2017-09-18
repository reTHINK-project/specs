---
layout: documentation
title: Observer unsubscribed by Reporter
category: How it Works - Data Synchronization
order: 9
---

![Figure: REporter Request Observer to unsubscribe the Sync Data Object](observer-unsubscribed-by-reporter.png.png)

The Data Object reporter post a [Unsubscribe Message](../../messages/data-sync-messages.md#unsubscribe-object-requested -by-reporter) requesting the Observer Hyperty to unsubscribe the Data Object.

The Hyperty Observer confirms the unsubscription and executes the [Data Object Unsubscribe process](data-object-unsubscription.md).
