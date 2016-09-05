### Communication Data Model

![Communication Data Object Model](Communication-Data-Object-Model.png)

The Communication Data Model is used to model the reTHINK Communications.

**starting time:** when communication is opened the first time

**last modified:** last change in the communication like new participant added or last message sent

**duration:** period of time between the first "OPEN" status and the last "CLOSED" status.

**status:** status of the communication. See CommunicationStatus below

**participants:** list of participants in the Communication (see below)

**qos:** *to be provided*

**resources:** list of HypertyResourceTypes supported by the communication. See below

**children = ["resources"]:** defines the Communication children (SyncObjectChildren) where all HypertyResources are shared DataObjectChild of a Communication.


#### CommunicationStatus

**OPEN:** Hyperty Resources can be shared in the communication

**PENDING:** Communication was created but no invited user has subscribed yet

**CLOSED:** Hyperty Resources can be shared in the communication

**PAUSED:** *skip?*

**FAILED:** communication creation failed for some reason eg no subscription received
