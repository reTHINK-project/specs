## Interoperability Tests
*to be completed*

This documents provides guidelines to perform interoperability tests with reTHINK framework.
Before you go ahead with these tests it is recommended to be familiar with main reTHINK concepts enabling full interoperability among services without having to standardize protocols or service APIs, as described *here (link to startup concepts wiki page)*.

The following tests allow to verify the usage of these concepts to support adhoc interoperability (i.e. interoperability between endpoints without previous knowledge) at different levels:

* Interoperability between two reTHINK different domains using different Messaging Nodes implementations including Protostubs but using the same Hyperty implementations.

* Interoperability between two reTHINK different domains using different Messaging Nodes implementations including Protostubs and different Hyperty implementations.

* Interoperability with legacy services, i.e., between one Hyperty and some non-reTHINK service.

### Tests Setup

Interoperability tests can be performed partially locally or fully using back-end services like the ones provided by reTHINK testbeds. In both options two Google accounts are required.

#### Interoperability Tests Setup with remote domains

This is the simplest setup environment where no service has to be installed locally. Only standard Browsers are required. The usage of Chrome or Firefox *(which versions?)* are recommended.
The *hysmart* testbed from Altice Labs using the [vertx](https://github.com/reTHINK-project/dev-msg-node-vertx) Messaging Node implementation and the *Tlabs* using the [Matrix based Messaging Node](https://github.com/reTHINK-project/dev-msg-node-matrix), are used in these guidelines but any reTHINK compliant testbed can be used. Just follow the [Quick Installation Guide for reTHINK Framework](https://github.com/reTHINK-project/specs/blob/master/deployment/readme.md) to deploy your own reTHINK domain or testbed.


#### Interoperability Tests Setup with one `localhost` domain and one remote domain

In this setup environment, one of the domains is installed as `localhost`. This kind of setup environment is useful to test locally some developments before deploying in testbeds. It also gives you more freedom to decide on the implementation to be used including your own implementation, if that is the case.

**Localhost installation:**

1. Toolkit installation: follow the quick toolkit installation guide as provided [here]((https://github.com/reTHINK-project/dev-hyperty-toolkit#quick-start).
1. Domain Registry installation: follow the installation guide [here](https://github.com/reTHINK-project/dev-domain-registry/readme.md)
1. Messaging Node installation: select one of the following Messaging Nodes implementation and perform the provided installation procedures:

  * [VertX](https://github.com/reTHINK-project/dev-msg-node-vertx)
  * [Matrix](https://github.com/reTHINK-project/dev-msg-node-matrix)
  * [NodeJS](https://github.com/reTHINK-project/dev-msg-node-nodejs)
  * [no Matrix](https://github.com/reTHINK-project/dev-msg-node-nomatrix)  

### Cross-domain with different protocols

The cross-domain interoperability test with different protocols allows to test how two domains using different messaging communication protocols, i.e. using two different Messaging Nodes implementations can interoperate without having to agree in advance on the protocol to be used.

#### WebRTC Audio and Video interoperability test

Step 1: Open one browser window at `https://hysmart.rethink.ptinovacao.pt/` and select "Connector Hyperty"

*insert picture showing pop menu with connector hyperty*

Step 2: A window will be opened asking you to select the Identity Provider to be used. Select Google and authenticate with your first Google account.

*insert pictures showing Google Idp selection*

*insert pictures showing Google login*

Step 3: Open a second browser window in anonymous mode at `https://rethink.tlabscloud.com/` and also select "Connector Hyperty"

*insert picture showing pop menu with connector hyperty*

Step 4: Similar to step 2 but now your second Google account is used.

*insert pictures showing Google Idp selection*

*insert pictures showing Google login*

Step 5: In the first opened Window, insert the email address you have used for your second Google account and the `https://rethink.tlabscloud.com/` domain. Click to discover WebRTC hyperties registered with such identity and at tlabs domain.

*insert pictures showing email and domain used for discovery*

Step 6: The Hyperty instance running in the second window should be discovered and its metadata including the Hyperty URL address should be displayed. Click to call the discovered Hyperty.

*insert pictures showing discovered Hyperty*

Step 7: An incoming call notification should popup in the second window.

*insert pictures showing incoming call*

Step 8: An WebRTC Audio and Video communication is established

*insert pictures showing connected call*

#### Group Chat interoperability test

Step 1: Open one browser window at `https://hysmart.rethink.ptinovacao.pt/` and select "Group Chat Manager Hyperty"

*insert picture showing pop menu with connector hyperty*

Step 2: A window will be opened asking you to select the Identity Provider to be used. Select Google and authenticate with your first Google account.

*insert pictures showing Google Idp selection*

*insert pictures showing Google login*

Step 3: Open a second browser window in anonymous mode at `https://rethink.tlabscloud.com/` and also select "Group Chat Manager Hyperty"

*insert picture showing pop menu with connector hyperty*

Step 4: Similar to step 2 but now your second Google account is used.

*insert pictures showing Google Idp selection*

*insert pictures showing Google login*

Step 5: In the first opened Window, click to create a new Group Chat. Insert the name for your Group Chat and invite as participant the used registered in the second window by inserting the email address you have used for your second Google account and the `https://rethink.tlabscloud.com/` domain. Click to create the Group Chat.

*insert pictures showing the window to create the Group Chat*

Step 6: The Group Chat should be created and the Hyperty instance running in the second window should join as participant.

*insert pictures showing created group chat on both windows*

Step 7: Both users can exchange messages

*insert pictures showing exchanged chat messages*

#### Group Chat interoperability with Slack legacy service

This test will require having two Slack accounts in some team. It is assumed the Group Chat created in the previous test, is still open.

Step 1: Open a third Browser window in some Slack team with your first Slack account.

*insert picture showing slack interface*

Step 2: In your first browser window click to add a new participant. Insert the slack user account used in the previous step and its slack domain and click to invite.

*insert picture showing window to invite the Slack user*

Step 3: A window will be opened asking you to select the Slack team where the invited user is, your Slack identifier as well as asking you authorisation to use it.

*insert pictures showing Slack login/Auth window*

Step 4: The Slack user should be added as the third participant to the Group Chat.

*insert pictures showing slack participant added to group chat on both 3 windows*

Step 5: The 3 users can exchange messages among them

*insert pictures showing exchanged chat messages*
