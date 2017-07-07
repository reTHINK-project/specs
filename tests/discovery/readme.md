# IMaDS

This section describes the usage of components involved in the IMaDS discovery and registry framework. Using the IMaDS framework, users can connect to other users' devices using a immutable GUID. The framework uses three components, being Discovery, Global Registry, and Domain Registry, while the ReThink runtime provides a GUI component to store and manage contacts in an addressbook application.

The Addressbook is a web based application included in the ReThink runtime that allows users to create and maintain one's identity. The Addressbook is reachable in the browser at localhost as part of the admin interface of the ReThink runtime. Its main screen shows a list of contacts and means to query for and add users:

![Addressbook Create GUID](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-main.png)

At first use, a new GUID needs to be created and registered in the Global Registry service. This is automated via the option "generate GUID" in the "Account"-menu. The process registers a new GUID and publishes it in in the Global Registry service along with information specified in the registration process.

![Addressbook Info](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-createguid.png)

To view and edit one's contact details, users can use the "get my information" function that displays a dialog with all details of the user's account. Changes can be made directly in the dialog and the changed account details can be directly sent to the Global Registry:

![Addressbook Info](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-info.png)

When selecting contacts in the Addressbook, available information for the selected contact is shown. This includes the username and ids: 

![Addressbook Details](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-details.png)

The Addressbook further allows to search for users either by a known GUID or arbitrary contact details:

![Addressbook Query](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-query.png)

The Discoevry service further provides a standalone web interface to enable users and other services to search for users.

INGO PLEASE ADD SOME CONTENT HERE
- Rest interface for other services
- User webinterface

In case the GUID is not known, the Discovery service of the ReThink framework can be queried. Here, all found contacts matching the search query are returned and can be added directly to the contact list:

![Discovery Result](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-result.png)

In case the GUID of the contact is known, the Addressbook application directly contacts the Global Registry service. Information retrieved from the Registry service is displayed in a dialog. The contact can then be directly added to the contact list:

![Addressbook Result](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-result.png)

RICARDO PLEASE ADD SOME CONTENT HERE
- Resolving UserID -> hyperty
- Interface(?)

While the example described above covers manual discovery and handling of user identifiers,resolving is usually carried out automatically. Here, a user specifies a GUID to contact, e.g. selected from the Addressbook application, which he wants to connect to, e.g. call. The IMaDS framework then automatically resolves a GUID to the user's UserIDs and further to this user's active Hyperty instances. Following this process, a connection is automatically initialized between two users.

A typical usage scenario of the IMaDS services comprise a user Alice, who wants to connect to another user Bob, who is registered in one or more service domains. If required, Alice would query the Discovery component to search for Bob using facts that describe Bob. By resolving Bob’s GUID via the Global Registry, she receives a list of service domains Bob is registered with. As each UserID in the returned dataset also comprises information about the respective service provider’s Domain Registry, Alice can now query the Domain Registry for Bob’s communication endpoint and establish a connection.
