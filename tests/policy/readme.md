## Policy framework Evaluation

*An overview of the framework and the rational for having two engines taking into account that PoliTHINK is also deployed in the MN*
* TENTATIVE for the foreword of the chapter

Policy engines (PE) are the software components that are used to create, manage, and enforce rules determining how network resources and services should be accessed in conformance with security and governance goals of the administrative domain. In reTHINK, we care for the end user devices and for the backend servers of the CSP domain. These two kinds of entities involve notable technical differences which lead us to identify two different PEs. : one is located in the runtime browser of the end device (frontend PE) and the other is in the backend server or messaging node of the CSP domain (backend PE). The frontend PE enforces policies defined by the end user in order to customize individual security and privacy preferences and also user experiences, while the backend PE monitors network traffic against policies managed by the CSP to ensure global security. Accordingly, two PEs are developed in reTHINK, namely JACPoL PE and PoliTHINK PE. The former PE is a typical backend PE and is implemented in the Node.js messaging node, and the latter is a frontend PE which can also be extended to be implemented in the backend messaging node. This section introduces and evaluates these two PEs respectively.

### [PoliTHINK Policy Engine](https://github.com/reTHINK-project/dev-runtime-core/blob/develop/docs/evaluation/policy-engine/README.md)

### [JACPoL Policy Engine](jacpol.md)

### [Comparison and recommendations](comparison.md)
