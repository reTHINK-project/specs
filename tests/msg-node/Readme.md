---
layout: documentation
title: Message Node Evaluation
category: Testing
order: 4
---

## Message Node tests

This folder structure contains common conformance tests for the Message Nodes according to the [Message Specification](../messages) and some performance related tests.

### Quickstart

#### Initial Setup

For the initial setup you  have to clone the testbeds repo to your machine and execute inside the "specs/tests/msg-node" folder

```
npm install
```

The project has a dependency to the service-framework, because it uses the MessageFactory wherever possible.

Of course the machine that runs the tests must have access to the individual Messaging Nodes. In order to gain comparable results it is stronly advised to have them running on the same local machine that executes the tests. The registry related testcases also require the availability of a running instance of the domain-registry, which is accessible by each MN.

Instructions for the installation, configuration and operation of the message nodes can be found on the corresponding github repos.

#### Configure Stubs

The "src/stub" folder contains the latest version of the Stub-sources for each of the currently available message nodes.
For each stub there is a corresponding config file:

```
matrix.conf.js
vertx.conf.js
nodejs.conf.js
```
This file is used to configure the stub with the information it needs. This configuration holds the same data as the "configuration" section in the ProtoStub.json file of the local catalogue.
The only added attribute is the "domain", which is mandatory and MUST be present. It is used in the testcases to create several urls for the from- and to- fields of the messages.

> NOTE: The MatrixProtoStub.js is also compatibile with the new NoMatrix MN at https://github.com/reTHINK-project/dev-msg-node-nomatrix. It also uses the same configuration items.

#### Execute tests for an individual Message Node

After the configuration of the stubs and the execution of the Message nodes the tests can be started via special gulp-tasks:

To test the MatrixMN run:

```
gulp testmatrix
```

To test the VertxMN run:

```
gulp testvertx
```

To test the NodejsMN run:

```
gulp testnodejs
```

Each task starts the Karma tests with an individual configuration file named "matrix.karma.js", "vertx.karma.js" and "nodejs.karma.js".

> NOTE: These files can be edited to specify/limit an indivdual set of test cases for execution by commenting them in or out.

### Test descriptions

#### Conformance tests

These tests evaluate the conformance of the MNs with the specified message request/response patterns.

##### connect.spec.js

The purpose of this test is to ensure that the Stub exposes the "status" events as specified in [ProtoStub Deployment Specification](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/specs/dynamic-view/basics/deploy-protostub.md)

It instantiats a stub and performs a connection and then a disconnection of the stub to the corresponding MN.

```
Specification issue:

The factual implementation in the Vertx stub introduced "connected" and "disconnected" events instead of the "LIVE" event as specified. This implementation has been taken over by the other stubs and is now de-facto standard.
```

##### hyperty-allocation.spec.js

The purpose of this test is to ensure the Conformance of the MN operations with the [Address Allocation Messages Specification](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/specs/messages/address-allocation-messages.md)

It checks the allocation and de-allocation of hyperty addresses by the MNs.
It includes following sub-tests:

- allocation of a single address
- check that a potentially given "scheme" is ignored for hyperty address allocations
- de-allocation of a single address
- allocation of an address block
- de-allocation of an address block
- allocation of an address block with an allocationKey
- de-allocation of an address block with an allocationKey

```
MessageFactory issue:

The MessageFactory does not support the "body.scheme" attribute. Therefore some allocation messages are created manually.
```

##### object-allocation.spec.js

The purpose of this test is to ensure the Conformance of the MN operations with the  [Address Allocation Messages Specification](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/specs/messages/address-allocation-messages.md)

It checks the allocation and de-allocation of object addresses by the MNs.
It includes following sub-tests:

- allocation of a single address incl. check that a given "scheme" is used for the object address allocations
- de-allocation of a single address
- allocation of an address block
- de-allocation of an address block
- allocation of an address block with an allocationKey
- de-allocation of an address block with an allocationKey

```
MessageFactory issue:

The MessageFactory does not support the "body.scheme" attribute. Therefore some allocation messages are created manually.
```

##### subscription.spec.js

The purpose of this test is to ensure the Conformance of the MN operations with the [Data Synchronization Message Specification](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/specs/messages/data-sync-messages.md)

It checks the subscription and un-susubscription for given object addresses at the MN as well as the correct publication of object update events to the subscribers.
It includes following sub-tests:

- subscription for an object address with a given body.source attribute
- subscription for an object address without a body.source attribute
- update of the subscribed object by the reporter and expect update events on both subscribers
- unsubscription of both subscribers
- another update of the subscribed object and ensure that no events are received by the (now unsubscribed) subscribers

##### registration.spec.js

The purpose of this test is to ensure the Conformance of the MN operations with the   [Registration Messages Specification](https://github.com/reTHINK-project/dev-service-framework/blob/master/docs/specs/messages/registration-messages.md)

It includes following sub-tests:

- registration of an allocated hyperty address for a given userid
- retrieval of a hyperty address by given userid
- retrieval of a hyperty address by given type and userid
- retrieval of a hyperty address by given object scheme and userid
- keep-alive message for an active registration
- unregistration of a hyperty address

#### Performance tests
These tests evaluate the performance and robustness of the MNs in forced situations of increased load. Therefore requests are sent in loops of increasing iteration counts and with differing message sizes. For each of these tests, the duration is measured and used as metric for the evaluation.

##### performance-alloc-hyperties.spec.js

These tests create and send an increasing number of allocation and de-allocation messages for Hyperty addresses to the MNs and expect a correct 200 OK response. The sizes of these messages are defined by the specification therefore they are not varied.

Following measurements are performed :

- Hyperty address allocation requests for 1 address each for 100, 1000 and 10000 iterations
- Hyperty address allocation requests for a block of 3 address each (without an allocation key) for 100, 1000 and 10000 iterations
- Hyperty address allocation requests for a block of 3 address each with an allocation key for 100, 1000 and 10000 iterations

##### performance-alloc-objects.spec.js

These tests create and send an increasing number of allocation and de-allocation messages for DataObject addresses to the MNs and expect a correct 200 OK response. The sizes of these messages are defined by the specification therefore they are not varied.

Following measurements are performed :

- Object address allocation requests for 1 address each for 100, 1000 and 10000 iterations
- Object address allocation requests for a block of 3 address each (without an allocation key) for 100, 1000 and 10000 iterations
- Objects address allocation requests for a block of 3 address each with an allocation key for 100, 1000 and 10000 iterations

##### performance-hyp-messages.spec.js
These tests send an increasing number of messages from one allocated Hyperty to a second allocated Hyperty, which is connected via a different stub. During the tests also the payload sizes are increased from 100B over 1kB to 10kB.
The measured time span starts when sending the first message from Hyperty 1 via Stub 1 and stops when receiving the last message by Hyperty 2 via Stub 2.

Following measurements are performed:
- Message with payload of 100B for 100, 1000 and 10000 iterations
- Message with payload of 1kB for 100, 1000 and 10000 iterations
- Message with payload of 10kB for 100, 1000 and 10000 iterations
