---
layout: documentation
title: Address Allocation
category: How it Works - Basics
order: 5
---

The Runtime procedures to allocate a new address to Hyperties or Data Objects are described in this section.

![Allocate Address](allocate-address.png)

Step 1: the address allocation is requested (either by the Runtime UA for Hyperty addresses or by the Sync Manager for Data Objects addresses. Optionaly, a reuseURL is provided in case the App or the Hyperty wants to reuse a previously used address. The Address owner is also optionally provided. For Hyperty addresses the owner is the user associated with the Hyperty, for Data Objects the owner is the Reporter Hyperty.

Steps 2 - 7: in case an data object URL allocation is requested and if no reuseURL is provided, this means this is a new data object and an address is allocated in cooperation with the Msg Node Address Allocation functionality ([Create Message](../../messages/address-allocation-messages.md#address-allocation-request)).

Steps 8: **Phase 2 New!** Otherwise the address allocation asks the Runtime Registry if there is a previously registry to be used. If the "reuseURL" is provided the Runtime Registry checks if that address is reusable ie if an existing registry matches the info provided.

Steps 9-11: If no address to be reused was found and if no reuseURL was provided, this means a new address has to be allocated: steps 2-7 are performed. Otherwise, if no address to be reused was found but a reuseURL was provided this means we have an error that is returned back.

Step 12 - 13: otherwise, if the Runtime Registry returns an Address, no further address allocation tasks are performed and the allocated address is returned with information about if this is a new allocated address or not.
