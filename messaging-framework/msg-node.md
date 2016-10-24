Messaging Node Architecture
---------------------------

The Messaging Node functional architecture is presented in the figure below and it comprises three main types of functionalities including the Core Functionalities, Connectors and Protocol Stubs.

Compared to the phase 1 version two additional components have been added to the Messaging Node Architecture, a Subscription Manager as well as a connector for the Global Registry.

![Figure @msg-node-architecture-messaging-node-architecture: Messaging Node Architecture](msg-node-architecture.png)

### Core Functionalities

#### Message BUS

The Message BUS routes messages to internal Messaging Node components and external elements by using Connectors or Protocol Stubs. It supports different communication patterns including publish/subscribe and Request/response communication.

#### Policy Engine

The Policy Engine provides Policy decision and Policy Enforcement functionalities at Domain level for incoming and outgoing messages in cooperation with authentication and authorisation provided by Identity Management functionalities. It also provides authorisation / access control to the Message BUS.

#### Session Management

Session Management functionalities are used to control messaging connections to service provider back-end services. For example, when user turns-on the device and connects to its domain, providing credentials as required by Identity Management functionalities. In general, each message should contain a valid token that is
generated when the client connects to the Messaging Node. It also manages the registry of protocol stubs and connectors supported by the Messaging Nodes to support the routing of messages to these components.

#### Address Allocation Management

The Address Allocation Management functionality handles the allocation of messaging addresses to instances of Hyperties and Synchronization Data objects in cooperation with Session Management when users connect to the domain. These addresses are valid for at least the lifetime of a session. They are used by the Subscription Manager and Message BUS to take routing decisions.
The specification of the messages to manage address allocations can be found at [Address-allocation-messages](https://github.com/reTHINK-project/specs/blob/master/messages/address-allocation-messages.md).

The Address Allocation Management is also responsible for the allocation of messaging addresses to foreign Hyperty Instances i.e. Hyperty Instances that are provided from external domains but that use the protofly concept to interact with Hyperty Instances served by this Messaging Node. For example, if the Messaging Node is implemented by core IMS or a simple SIP Proxy/SIP Registry, it might require the management of a pool of SIP addresses to be allocated to clients that have no account in the IMS HSS or in the SIP registry.

Address Allocation Management functionality must have listeners to receive messages for the following addresses:

```
domain://msg-node.<sp-domain>/hyperty-address-allocation
domain://msg-node.<sp-domain>/object-address-allocation
```

### Subscription Manager

The Message Node Subscription Manager is in charge of handling Subscription and Unsubscription requests from Runtime Sync Managers in order to manage the Data Sync Stream routing path in the Message Node.

The Subscription Manager functionality must have listeners to receive messages for the following addresses:

```
domain://msg-node.<sp-domain>/sm
```

### Protocol Stub

In special situations e.g. when the download of external software (protocol stubs) into end-user devices is not allowed or not possible due to technical constraints, it should be possible to have interoperability between Messaging Nodes from different domains, by using the protofly concept between the Messaging Nodes.
Thus, a Protocol Stack to be used to communicate with another Messaging Node can be deployed into the runtime of the Messaging node.

### Connectors

Connectors implements protocol stacks used to interoperate with external elements from the domains,. In general there are connectors for outgoing access to components inside or outside the own domain and on the other hand endpoints listening for incoming connections from external entities, like hyperty runtimes on end-user/network- devices.
All types of Connectors can be supported by using protocol on-the-fly concept, giving more flexibility for the integration of the Messaging Node in the Service Provider infra-structure.

#### IdM Connector

The IdM connector provides access to the domains Identity Manager. The IdM functionalities support the Session Manager for a general Access Control and the Policy Manager for the validation of identity tokens in messages and the enforcement of routing policies.

It must have listeners to receive messages for the following addresses:

```
domain://idm.<sp-domain>
```

#### Domain Registry Connector

The Domain Registry Connector handles messages for the registration, un-registration and lookup of Hyperties and Data Objects in the domain registry. The specification of these messages can be found at [Registration messages](https://github.com/reTHINK-project/specs/blob/master/messages/registration-messages.md). The Domain Registry Connector mainly acts as a “relay” between the hyperty runtimes and the domain registry. It does not actively process the messages and responses. This connector is mandatory because the direct access to the Domain registry from hyperty runtimes should be restricted.

It must have listeners to receive messages for the following addresses:

```
domain://registry.<sp-domain>
```

#### Global Registry Connector

The role of the Global Registry Connector is comparable to the connector for the Domain Registry. It acts as a relay between the hyperty runtimes and the Global Registry. This Connector is optional. It might be required in cases where the runtime itself might not be able to establish an own connection to the Global registry. In such cases it can use the Connector running on the MN of its home-domain to access it.
The specification of the messages for the interaction with the global registry can be found at [Global Registry messages](https://github.com/reTHINK-project/specs/blob/master/messages/global-registry-messages.md).

It must have listeners to receive messages for the following addresses:

```
global://registry/
```

#### End-User Device Connector / Network Server Connector

These Connectors provide the “server-side” for connections that are initiated by protocol stubs running inside of Hyperty runtimes. These runtimes can either be running on end-user devices (e.g. in a browser or stand-alone) or on network-server devices, for example on an embedded system that  supports an IoT use case.
A simple technical example for such a connector is a Websocket server that waits for connection requests from externally deployed stubs and handles them. The types of required server-side connectors correlates to the types of stubs that the MN needs to support. If a stub, for instance, needs to establish a REST like communication with the MN than the MN must operate a connector that implements the REST server endpoint.
