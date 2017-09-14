---
layout: documentation
title: H2H Multiparty Conversations
category: Use-Cases
order: 10
---

## Actors

Alice, Bob and Daniel are [Identified Consumers](../business-models/business-roles.md#identified-service-consumer) that are subscribers of different [Communication Service Providers](../business-models/business-roles.md#communication-service-provider).

Carol is a [Consumer](../business-models/business-roles.md#identified-service-consumer) that has no known CSP subscription.

## Pre-condition

- Alice and Bob are [registered in different CSPs](../User%20Authentication%20and%20Registration.md)
- Carol is not registered in any CSP
- Alice has [Bob and Daniel in her contact list](../Human%20Context%20Presence%20Management.md)
- Alice only knows Carol email address

## Description

Alice wants to organise an AV Conversation with Bob and Carol.
She selects Bob from her Contact List and invites him for the conversation while she sends by email the conversation link to Carol who is not in Alice’s contact list.
Bob receives in his App the incoming invitation alert to join the Conversation meeting which he accepts. Carol clicks in the conversation link received by email, opens a web page where she inserts her name and email and click to join the Conversation Meeting.
Alice is able to see that Bob and Carol have joined the Conversation, as soon as their Video images appear in the Conversation window and they are able to talk to each other. Bob and Carol can also see and talk to all participants in Conversation.

During the conversation Alice, Bob and Carol can:
- type and send text messages to all Conversation participants,
- send and receive text (e.g. documents) and binary files (e.g. images, videos) stored in the file system of the device used to all Conversation participants,
- share what is being displayed on her/his screen with all Conversation participants.

Shared video images, exchanged text messages and all exchanged files should be all presented in the same Conversation context e.g., they should be displayed in the same Conversation UI Window.
In each Conversation UI there is a larger window that shows the speaker or presenter image while remaining participants image are shown in smaller windows. Anyway, each participant is free to select which participant image to show in the larger window by selecting its image.

In the middle of the conversation Alice decides to invite Daniel from her contact list which receives and accepts the Invitation alert to join the conversation.

During the conversation, Alice, as the meeting organiser has more privileges than others e.g., she is able to mute/unmute and kick-out other participants from the meeting. In case she wants to exit the conversation but let the remaining participants go on in the conversation she has to delegate the organiser role to another participant. Otherwise, the meeting will close as soon as the organiser leaves.

**Implementation Note:** two main approaches:
1. No media Server is used and all peers must be connected to each other. Since the usage of bandwitdth and cpu of WebRTC end-points, exponentially increases with number of participants, it should only be used for small meeting conversations.
2. A Media Server is used and a Star connection topology is used i.e., all media and data connections from participants must be established with the Media Server. With this approach [Dynamic Media Server or Media Gateway provisioning](../Dynamic%20Media%20Server%20or%20Media%20Gateway%20provisioning.md) Use Case is used to support dynamic "provisioning" of the Media Server in the Conversation.

### Variants

1. A "Meeting Room" approach may be used where participants knows the Conversation address that is e.g. inserted in a Calendar, and Participants would join the meeting by using the conversation address
2. Participants can join the Conversation by using Anonymous or Fake identities as defined in #63 use case

## Differentiation - market relevance

Not currently possible with Web Communications. Essential to achieve seamless interoperabilty between any user without having the need to use more than one conversational App.
Overcomes the domination of established communications providers.
Building bridges across network borders.

#86 H2H Communication UC
