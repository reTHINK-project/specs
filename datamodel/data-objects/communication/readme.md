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

#### Examples

Parent Communication Data Object:

```
{
  "url" : "comm://mydomain/1234-qwert",
  "cseq" : 2,
  "reporter" : "hypert://mydomain/56789-gfdjhlfdf",
  "schema" : "hyperty-catalogue://catalogue.mydomain/.well-known/dataschema/communication",
  "name" : "vacations plan",
  "created" : "Thu Mar 02 2017 16:30:09 GMT+0000",
  "startingTime" : "Thu Mar 02 2017 16:32:19 GMT+0000",
  "lastModified" : "Thu Mar 02 2017 17:23:43 GMT+0000",
  "status" : "open",
  "children" : ["resources"],
  "participants" : {
    "hypert://mydomain/56789-gfdjhlfdf" : {
      "identity" : { ... }
    },
    "hypert://otherdomain/gfdjhlfdf-56789" : {
      "identity" : { ... }
    }
  }
}
```

Static Children Data Object:

```
{
  "parent" : "communication",
  "listener" : "resource",
  "type" : "HypertyResource"
}
```

Chat Message Example:

```
{
  "url" : "comm://mydomain/1234-qwert/children/resources/56789-gfdjhlfdf#3",
  "cseq" : 2,
  "reporter" : "hypert://mydomain/56789-gfdjhlfdf",
  "schema" : "hyperty-catalogue://catalogue.mydomain/.well-known/dataschema/communication",
  "name" : "some chat message name",
  "created" : "Thu Mar 02 2017 16:36:09 GMT+0000",
  "type" : "chat",
  "content" : "hello, this is my message"
}
```

File Example:

```
{
  "url" : "comm://mydomain/1234-qwert/children/resources/56789-gfdjhlfdf#2",
  "cseq" : 1,
  "reporter" : "hypert://mydomain/56789-gfdjhlfdf",
  "schema" : "hyperty-catalogue://catalogue.mydomain/.well-known/dataschema/communication",
  "name" : "My favourite city",
  "type" : "file",
  "mimetype" : "image/jpeg"
  "created" : "Thu Mar 02 2017 18:36:09 GMT+0000",
  "content" : "ÿØÿàJFIFHHÿáÒExifMM*.."
}
```
