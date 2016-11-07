## Group Communication
The goal of this repository is to provide specifications for enabling WebRTC group communication in reTHINK (aka WebRTC Multiparty). Furthermore, an ongoing discussions about these specs can be found here [WebRTC Multiparty #106](https://github.com/reTHINK-project/dev-runtime-core/issues/106#issuecomment-245019063). Besides,in this issue more details and arguments can be found as well.

## 1. Group communication Architecture

We can distinguish two topologies :

### 1.1  Full mesh topology

<p align="justify"> In full mesh WebRTC conference, every peer establishes a connection with the rest of the participant peers. Thus, n*(n-1) number of connections are needed, where n is the number of participant peers. For examples, a full mesh topology of 4 users has 12 connections.(See Figure 1)</p>

This topology performs well for a small number for participants. Easy to deploy without extra resources(no server is needed).

However, it is inefficient for scalable multiparty systems. As the number of participants increases, bandwidth and CPU processing consumption becomes more excessive on peer side, which is not scalable, especially for mobile Peers.

 <p align="center">
  ![Mesh-Topology](/dynamic-view/group-communication/Full-Mesh-Topology.png)
</p>  
<p align="center">
  Figure 1 : Full Mesh Topology for group ommunication
</p>

### 1.2  Star topology

<p align="justify">Alternatively, in a star topology, a relay server in the middle will be in charge of establishing peer connections and distributing streams among peers. As result, each peer establishes only one peer connection to the media server independently of the increasing number of peers. Which is very scalable approach. In such way, all the burden and processing is left to the middle server. However, an extra latency will be observed due to the presence of the intermediary server.</p>

This star topology, describes H2H WebRTC group communication between reTHINK users. Therefore, peer conference hyperties running on runtime browsers will exchange signaling descriptions between each other and the media server through reTHINK edge server(Runtime Node).Particularly, reTHINK Runtime Node [dev-runtime-nodejs](https://github.com/reTHINK-project/dev-runtime-nodejs) is a justified choice for exchanging WebRTC signaling. In addition, Runtime Node is a fully conform with reTHINK specs in term of reliability and security.(See Figure 2)

 <p align="center">
          ![Star-Topology](../dynamic-view/group-communication/Star Topology.png)
</p>
<p align="center">
  Figure 2 : Star Topology for group communication
</p>

## 1.3 Proposal architecture

According to the reasons presented above, star topology seems a good candidate for scalable rethink WebRTC group communication.

Figure 3, provides a big picture of this topology. Essentially, three main components are required in this topology : `Peer conference Hyperty` running on `Runtime browser`, `Conference Hyperty` running on `Runtime Node`, and the `Media Server`. While, the messaging node is just relay point in reTHINK framework. Thus, it's transparent for the different communication messages.


![../dynamic-view/group-communication/Multiparty-WebRTC-overall-Archi
.png](../dynamic-view/group-communication/Multiparty-WebRTC-overall-Archi.png)
<p align="center">
  Figure 3 : reTHINK Group cummunication overall architecture
</p>

In the following sections call flows between the components of this topology will be given.

## 2. Top level view call flows

Figure 4, illustrates top level view of how these call flows might look like.
These call flows involve `Hyperty conference of Peer A` running on runtime browser A, `Hyperty conference of Peer B`, Message Node(just relay no processing), `Media server`, and `Hyperty conference` running on Runtime Node as signaling server relaying messages between them.
 <p align="center">
![../dynamic-view/group-communication/Top-Level-View](../dynamic-view/group-communication/Top-Level-View.png)
</p>
<p align="center">
  Figure 4 : Top level view call flows
</p>

The sequence diagram evolves through the following macro steps:

1. The Hyperty conference (signaling server) connects to messaging node associated with Runtime Node and registers its instance in its CSP domain registry.
2. The CSP domain registry registers the hyperty and provides back hyperty url to the Hyperty conference through the messaging node.
3. At this point the Hyperty conference (signaling server) creates a signaling channel, up listening for any incoming message from Peers.
4. Hyperty conference of Peer A (initiator) queries the messaging node to register its instance.
5. The Messaging node registers the hyperty and replies back giving it an hyperty url.
6. Hyperty conference of Peer A connects to the Hyperty conference server and joins the channel.
7. The Hyperty conference accepts/refuses the join request.
8. If accepted, the Hyperty conference of Peer A (creates `communication data object`). Then, it sends its sdp offer to the media server via the signaling server.
9. Upon receipt of the SDP offer, the Media server creates room pipeline and generates an SDP answer to be sent back (via the signaling server) to the remote Peer A.
10. Hyperty conference of Peer A sends its local stream directly to the media server.
11. If Hyperty conference of Peer B wants to join(the joiner) the same room  as Peer A, it mirrors the same behavior of hyperty A from step 4) to 10).
12. Finally, The Hyperty conference interconnects the two streams on the media server.
13. At this point media streams are exchanged between Peer A and Peer B though the media server in star topology.

## 3. Detailed call flows
In this section, we mainly describe the internal logic architecture of the Peers and conference Hyperties.

### 3.1 Peer Conference Hyperty Logic

The `Peer conference hyperty` is supposed to be running on runtime browser of user initiating/joining the conference. This hyperty uses reTHINK WebRTC connection model [Connection Data Model](https://github.com/reTHINK-project/specs/tree/master/datamodel/data-objects/connection) , capable of handling WebRTC conferencing. These call flows involve `Peer Conference App`, `Peer Conference Hyperty`, `Syncher` , and the `Message Bus`.(see figure 5)

![Peer Conference Hyperty](../dynamic-view/group-communication/Peer-Conference-Hyperty.png)
<p align="center">
  Figure 5 : Peer Conference Hyperty internal architecture
</p>

In the following step-by-step description:

1. First, the `Peer Conference App` will issue a request message to the `Peer conference Hyperty` asking to join a specific room, given that it knows already the `roomId` and the `conferenceHypertyURL` or it may search for existing Conference server Hyperties instances according to the [hyperty discovery mechanism](https://github.com/reTHINK-project/specs/blob/master/dynamic-view/discovery/hyperty-discovery.md) in order to interacts with them. Otherwise, it requests the creation of a new room. Besides, provisioning for options is possible.
2. The `Peer Conference hyperty` will get the local description of the peer issuing the request message.
3. Next, the hyperty will ask the `Syncher` to create connection object schema, for which is reporter(owner). Simultaneously, it's an observer of the room communication object (description will be provided about this conference side communication data object) involved in the communication.
4. The `Syncher` sends create communication object request to the `Conference Hyperty` through the `Message Bus`.
5. Finally, once an OK piggybacked response message is received. The `Syncher` will include received parameters(SDP answer,etc.) from the conference hyperty to the data communication object. Afterwards, it returns it to the `Peer conference Hyperty`, That includes it in its local connection controller object in order to control the Peer WebRTC parameters.

#### Note:
<p align="justify">The room communication object is a special object, created and maintained by the conference Hyperty upon incoming request from Peers hyperties to create new room. Thus, this object is related to a room. Besides, is created by the conference Hyperty which means is the reporter (owner) of this communication object. This object will be destroyed when the last participants leaves the room.</p>

### 3.2 Conference Hyperty Logic

The ` conference hyperty` will be loaded and executed inside Runtime Node.The figure below represents the internal architecture of the `Conference Hyperty`. Essentially, we describe the messages exchanged between the `Conference App`, `Conference Hyperty`, and the `Syncher`(provided by the core runtime).


<p align="justify">We suppose that this conference hyperty is up running waiting for connection incoming requests. This hyperty will have an interesting feature of coordinating multiple data objects, each per room. an orchestrator hyperty.</p>


![Server Conference Hyperty](../dynamic-view/group-communication/Conference-Hyperty.png)
<p align="center">
  Figure 6 : The Conference Hyperty internal architecture
</p>

The sequence diagram evolves through the following macro steps:  

1. The Message BUS receives incoming request to create communication object including `roomId` and some options. This message is mainly coming from the peer joining the conference room, through the messaging node associated with domain where this conference application is hosted.  
2. Next, the conference hyperty receives a notification message. Then, it forward this request to the conference application.
3. The conference app, it will check if the `roomId` is new or not. Particularly, it will discover in its CSP domain registry for already registered room communication object associated with same roomId ([according to the data object discorvery](https://github.com/reTHINK-project/specs/blob/master/dynamic-view/discovery/hyperty-discovery.md)). In case of new room, the conference application will request the media server to create room pipeline, and returns an SDP answer to incoming request.
4. After, the conference hyperty will in its turn request the `Syncher` to subscribe to the Peer hyperty data object that requests to join the room.  
5. Then, `the conference hyperty` will also request `Syncher` to create room data communication object associated to this `roomId`. This room communication object is owned by `the conference hyperty`. Thus, it's the reporter for this object. Each room has its own communication data object. Bijective relationship. Thus, this communication object maintains several observers hyperties. (Similar to group chat hyperty). Everytime a new room pipeline is created in the media server, the hyperty will create an associated communication data objects.


In case another participant joins the same room (`identified by roomId`), `the conference hyperty` mirrors the same behavior from step 9. to 13. (see Figure 6). However, it will not create new communication data object, since it has been already created for the room in question. Instead, the Hyperty will discover in its CSP domain registry for already registered room communication object associated with same roomId ([according to the data object discorvery](https://github.com/reTHINK-project/specs/blob/master/dynamic-view/discovery/hyperty-discovery.md)). Then, it will subscribe this new peer(observer) into the existing room communication data object. Then, as in 4) the conference hyperty will subscribe to new peer data objects. Afterwards, media will start following between peers. `The conference hyperty` will request previously communication controller related to this room to interconnect peers media streams at media server.

#### Note:
<p align="justify"> The identity of user(reTHINK edge server) behind the conference hyperty is a static default identity asserted locally at runtime. In this case no user interaction is needed. This is temporarly solution, that surely will be optimized in the future. </p>
Ongoing discussion could be found here [Identity Management at NodeJS](https://github.com/reTHINK-project/specs/issues/17) and specs wil be provided here [Id Management for conference hyperty](https://github.com/reTHINK-project/specs/blob/master/group-communication/IdM-conference-hyperty.md).
