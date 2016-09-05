### Connection

![Connection Data Object Model](Connection-Data-Object-Model.png)

The connection object is a SyncData Object that contains the OwnerPeer and points to other non-owner peers. The OwnerPeer contains WebRTC standardised IceCandidates and Connection Description objects or ORTC standardised RtpTransportParameters objects (for ORTC compliant browsers).

A Peer object is a SyncData Object that also contains WebRTC standardised IceCandidates and Connection Description objects or ORTC standardised RtpTransportParameters objects (for ORTC compliant browsers).

The Hyperty that owns the Connection object is its reporter and the observer of all other Peers object involved in the Connection object. In this case, the OwnerPeer object contains local PeerConnection data and Peer object contains remote PeerConnection data.

Non-owner Hyperties are Observers of the Connection object and the Reporter of its Peer object. In this case, the OwnerPeer object contains remote PeerConnection data and Peer object contains local PeerConnection data. For Group connections, non-owner Hyperties are also observers of other non-owner Peers.
