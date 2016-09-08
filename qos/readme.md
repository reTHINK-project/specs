## Quality of Service

*to provide here qos related specification defining architectural functionalities and concepts involved. A dynamic view should be provided [here](../dynamic-view/qos/readme.md) with MSC diagrams and the specification of messages would be provided [here](../messages/qos-management-messages.md)*


### Overview

#### QoS in reTHINK

The reTHINK architecture enables activating QoS and policy as selectable options, via APIs to the service providers. While OTT services have no such choice, and Mobile services automatically provide managed QoS over managed packet network, the reTHINK architecture can deliver QoS ‘on-demand’ over the Internet, selected only where necessary, according to network conditions, user preference and service requirements.
Several QoS enforcing points and technologies have been envisioned. One of the solutions is based on providing QoS on CPE Broadband and mobile access. The other one is a solution based on network selection (LHCB).
![qosoverview](https://cloud.githubusercontent.com/assets/10738516/18352706/c3108348-75df-11e6-82a8-66793ed0ca4f.png)

#### reTHINK TURN services

*very short description of how TURN supports QoS.  We focus in this text in general on the Runtime interface, i.e., a detailed description of the backend TURN services will and should be part of the dedicated QoS deliverable.  Just name involved components in general to allow the reader to get a genral idea of the big picture.  Do not include interface specs for interfaces that do not immediately communicate / involve the runtime QoS Agent*
![qos](https://cloud.githubusercontent.com/assets/10738516/18352611/5f6843c6-75df-11e6-9185-118147e31177.png)
 
#### Last Hop Connectivity Broker

*very short description of how TURN supports LHCB.  We focus in this text in general on the Runtime interface, i.e., a detailed description of the backend TURN services will and should be part of the dedicated QoS deliverable.  Just name involved components in general to allow the reader to get a genral idea of the big picture.  Do not include interface specs for interfaces that do not immediately communicate / involve the runtime QoS Agent*

### Interface of reTHINK QoS support with the Runtime QoS Agent

*specify the interface of the Runtime QoS Agent here.  Currently, only the DIRECT interface of the Runtime QoS Agent with other QoS components is in scope.  This section might actually not appear in this md-file but instead  [here](../dynamic-view/qos/readme.md) with MSC diagrams and the specification of messages would be provided [here](../messages/qos-management-messages.md)*

**Note:  the final spec should be included (refined) the the dedicated QoS deliverable**
