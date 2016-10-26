# reTHINK Framework Specifications

You'll find here the full detailed specification of reTHINK Framework

The reTHINK Framework provides a [decentralised communication infrastructure](http://www.rand.org/pubs/research_memoranda/RM3420.html) to make network services **faster**, **more effective**, **more trustful**, **fully programmable** and **implicitly inter-operable**. Only data formats are required to be standardised to ensure interoperability. No standards are needed for network protocols or for APIs, radically reducing standardisation efforts. Ultimately, reTHINK framework is an alternative to current [dominant walled garden communication networks](https://www.theguardian.com/technology/2012/apr/17/walled-gardens-facebook-apple-censors) that prevent newcomers from entering in the market and, at the same time, [empowers the users](https://techcrunch.com/2016/10/09/a-decentralized-web-would-give-power-back-to-the-people-online/) with the choice and the management of their private data and identities.


The reTHINK Framework provides the tools to build a global decentralised network of [Hyperlinked Entities (hyperties)](tutorials/hyperty.md) that are [executed at the edge](/runtime) and [trustfully](/trust-management) communicates through a [Decentralised Messaging Framework](messaging-framework/readme.md).

![reTHINK architecture](rethink-arch.png)

Watch reTHINK Overview YouTube Video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=8H57GIBs31o
" target="_blank"><img src="http://img.youtube.com/vi/8H57GIBs31o/0.jpg" 
alt="reTHINK Overview" width="240" height="180" border="10" /></a>



This repository contains specifications for:

* [the decentralised communication framework specification](messaging-framework/readme.md) that is used to support hyperty communication across domains dramaticaly reducing standardisation efforts thanks to the protocol-on-the-fly concept and to the P2P Reporter-Observer pattern.
* [the runtime specification](runtime/readme.md) that is used to support Hyperties execution in multiple platforms including browsers, NodeJS and Smartphones.
* [the trust and identity management specification](trust-management/readme.md) that supports fully secured and trustful communication among Hyperties by using independent Identity Providers, giving the user full control of his Identity and personal data.
* [the Quality of Service management specification](qos/readme.md) that supports quality of service on-demand (work in progress).
* [the specification on how to support multiparty / group communication](group-communication/readme.md)
* [the specification on how to interoperate with legacy services that are not compliant with reTHINK framework](legacy-interoperability/readme.md)
* [the service framework specification](service-framework/readme.md) that provides some libraries to facilitate the development of Hyperties compliant with the specs.

Transversal to these specs we have:  

* the Core Data Model defined in more human friendly [UML Class Diagrams](datamodel/core) and in more machine friendly [json-schema](schemas/json-schema/core) *probably we should provide more textual decription*
* the Data Object Model used by Hyperties to communicate each other, defined in more human friendly [UML Class Diagrams](datamodel/data-objects) and in more machine friendly [json-schema](schemas/json-schema/data-objects) *probably we should provide more textual decription*
* the detailed specification of [messages](messages) used to support the different framework procedures including hyperty deployment, hyperty registration, identity management, discovery, etc
* A [dynamic view](dynamic-view) on how the main framework procedures are performed through Message Sequence Charts including hyperty deployment, hyperty registration, identity management, discovery, etc

You can also find in this repo a set of [tutorials](tutorials/readme.md) to support the development of Hyperties, Apps and Message Nodes.

In order to setup your own reTHINK Framework, you should install the several components (docker images available). The full process is described in [deployment section](deployment/readme.md). Developers only have to use [toolkit](https://github.com/reTHINK-project/dev-hyperty-toolkit).

