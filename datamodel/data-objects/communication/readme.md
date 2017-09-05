---
layout: documentation
title: Communication
category: datamodel
---

### Communication Data Model

![Communication Data Object Model](Communication-Data-Object-Model.png)

The Communication Data Model is used to model the reTHINK Communications.

**starting time:** when communication is opened the first time

**duration:** period of time between the first "OPEN" status and the last "CLOSED" status.

**status:** status of the communication. See CommunicationStatus below

**participants:** list of participants in the Communication (see below)

#### participant

**domain:** the domain of the participant

**status:** the status of the participant in the communication (see below)

**hypertyURL:** the Hyperty URL of the participant

**identity:** Information about the participant identity as defined by the User Identity model

**resources:** a list of Hyperty Resources supported by the Hyperty used by the participant as defined by the HypertyResource model

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
  "startingTime" : "Thu Mar 02 2017 16:32:19 GMT+0000",
  "status" : "open",
  "participants" : {
    "user://myidp/me@mail.com" : {
      "hypertyURL": "hyperty://example.com/dfdjkfhkjshf-dhkfdjkfhs",
      "domain": "example.com",
      "resources": ['chat','file'],
      "identity": { ... }
    },
    "user://myotheridp/meagain@net.com" : {
      "identity" : { ... }
    }
  }
}
```

Static Children Data Object:

```
{
  "parent" : "communication",
  "listener" : "resources",
  "type" : "HypertyResource"
}
```

Chat Message Example:

```
{
  "type" : "chat",
  "content" : "hello, this is my message"
}
```

File Example:

```
{
  "type" : "file",
  "mimetype" : "image/jpeg"
  "content" : "ÿØÿàJFIFHHÿáÒExifMM*.."
}
```
