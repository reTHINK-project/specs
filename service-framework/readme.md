---
layout: documentation
title: Service Framework
category: service-framework
---

Service Framework
------------------
#Service Framework
-----------------

The reTHINK Service Framework provides a comprehensive set of application program interfaces (namly APIs) and JavaScript-based libraries to support the development of Hyperties.  As such, the Service Framework is agnostic with respect to the underlying messaging node, modular in design, and to the widest degree agnostic to devices and their operating systems, such as Android, iOS, Raspberry PI, Linux, or Windows. It features a comprehensive set of application program interfaces (APIs) and JavaScript libraries to facilitate the development of Hyperties within the reTHINK architecture.

As such, the reTHINK Service Framework enables the design of the Hyperty Runtime APIs to be developer-friendly, i.e., the latter only have to focus on a few core functionalities, namely:

**Messaging Framework Bus**

Simple bus API to send and receive messages:

`postMessage(inMsg, responseCallback)` that is used to post messages in order to communicate with registered listeners.

`addListener(url, listener)` that is used to register a listener to receive message when `msg.to === url`.

Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-runtime-core/class/src/bus/Bus.js~Bus.html)

**Syncher**

The	[Syncher API](syncher.md) that is used to synchronise data among Hyperties by using the Reporter-Observer communication pattern.

Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-service-framework/class/src/syncher/Syncher.js~Syncher.html)

**Discovery**

The Discovery library allows the discovery of remote Hyperties or Data Objects by using different criteria.
Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-service-framework/class/src/discovery/Discovery.js~Discovery.html).

**Identity Manager**

The [Identity Manager library](identity-manager.md) retrieves information about Identities associated to Hyperties.
Full documentation [here](https://doc.esdoc.org/github.com/reTHINK-project/dev-service-framework/class/src/identityManager/IdentityManager.js~IdentityManager.html).


**Other Useful APIs:**

* Service Framework [Address Factory](address-factory.md)
* Service Framework [Message Factory](message-factory.md)
* [Runtime Capabilities Manager](runtime-capabilities-manager.md),
* [QoS interface and LHCB library](qos.md),
* [Storage Manager](storage-manager.md).
