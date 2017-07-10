# IMaDS

This section describes the usage of components involved in the IMaDS discovery and registry framework [1][2]. Using the IMaDS framework, users can connect to other users' devices using a immutable GUID. The framework uses three components, being Discovery, Global Registry, and Domain Registry, while the ReThink runtime provides a GUI component to store and manage contacts in an addressbook application
The Addressbook is a web based application included in the ReThink runtime that allows users to create and maintain one's identity. The Addressbook is reachable in the browser at localhost as part of the admin interface of the ReThink runtime. Its main screen shows a list of contacts and means to query for and add users:

![Addressbook Create GUID](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-main.png)

At first use, a new GUID needs to be created and registered in the Global Registry service. This is automated via the option "generate GUID" in the "Account"-menu. The process registers a new GUID and publishes it in in the Global Registry service along with information specified in the registration process.

![Addressbook Info](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-createguid.png)

To view and edit one's contact details, users can use the "get my information" function that displays a dialog with all details of the user's account. Changes can be made directly in the dialog and the changed account details can be directly sent to the Global Registry:
![Addressbook Info](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-info.png)

When selecting contacts in the Addressbook, available information for the selected contact is shown. This includes the username and ids:
![Addressbook Details](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-details.png)

hThe Addressbook further allows to search for users either by a known GUID or arbitrary contact details:

![Addressbook Query](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-query.png)

The DISCOVERY SERVICE further provides a standalone web interface to enable users and other services to search for users. People are used to use search engines like google when they want to find information about a certain topic. In the same way they can search for persons or also devices in reTHINK. They formulate a search query like “Michael Mueller T-Labs” or “reTHINK Project” in order to find one or more so called profiles of a person or a device. Although this service is easy to use like a classic search engine there are fundamental differences.

Source of query results:
Search results are profiles that are written by the user that want to be found. Results are not crawled or scanned in the Internet. Every user that wants to be found or that wants his devices to be found can create one or many profiles within the discovery service.
These profiles stay fully under user control.

Policy-based visibility:
Every profile can be configured with a certain visibility. So the owner of a profile can configure which user or which group of users can see his profile.

Interfaces

Web-GUI
The reTHINK discovery has a Web-Interface for users that want to use reTHINK discovery with their browser like they are used to from a classic search-engine. Furthermore the web-GUI enables to create and manage profile accounts.

![Discovery GUI search mask](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/reTHINK_mask.png)
'
1) Plain web search
The user can go to the reTHINK Discovery Website as shown in Figure 1 and search for users or devices. The search results are so called profiles. They have a headline and some text for description. They might have hashtags describing certain topics, communities, locations etc.. Profiles can also contain communication endpoints like e-mail address, phone number, websites, facebook- or linkedin profile URLs.

![Discovery GUI search results](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/reTHINK_search_results.png)

2) Create an own account
Every user has the possibility to create an own account with the reTHINK discovery service. 

![Discovery GUI profile registration mask](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/reTHINK_register_mask.png)


REST-API

TThe discovery service offers a REST-API for search queries. The interface can be "pinged" by e.g GET https://rethink.tlabscloud.com/discovery/rest/discover 
To search eg. for "Hans Telekom" call 
GET https://rethink.tlabscloud.com/discovery/rest/discover/lookup?searchquery=Hans+Telekom
The answer is a JSON Object like for Example:

```
{ 
"instanceID":"telekom1", 
"responseCode":201, 
"searchString":"Hans+Schmitt", 
"results": [ 
{ 
"resultNo":0, 
"instanceID":"telekom1", 
"hashtags":"T-Labs Telekom", 
"description":"Hans Testprofile text text text", 
"rethinkID":"REAyDT-tYQI2u1km9LgYj05zb1hLmy__XlIN5B1LWUQ", 
"headline":"Hans", 
"contacts":"Hans.Schmitt@telekom.de", 
"hasrethinkID":"true", 
"hyperties": [ 
{ 
"url":"hyperty=hyperty%3A%2F%2Frethink-dev.tlabscloud.com%2Fd2aad579-a213-4400-9e24-af2b23dbaed8", 
"userID":"uid=user:\\gmail.com\hans.schmitt",
 "media":"VIDEO",
 "provider":"Deutsche Telekom" 
}, 
{ 
"url":"hyperty=hyperty%3A%2F%2Frethink-dev.tlabscloud.com%2Fb71cd853-f657-4b6a-919b-07916bd3d50e",
 "userID":"uid=user:\\gmail.com\hans.schmitt",
 "media":"VIDEO", 
"provider":"Deutsche Telekom" 
} 
]
 } ] }

```
The result contains beside the profile content the instanceID. This instanceID is used to distinguish between different Discovery service instances. Furthermore the endpoint of all hyperties that are currently running are shown including supported media type and the regarded service provider as well as the used identity aka. userID.

In case the GUID is not known, the Discovery service of the ReThink framework can be queried. Here, all found contacts matching the search query are returned and can be added directly to the contact list:

![Discovery Result](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-result.png)

In case the GUID of the contact is known, the Addressbook application directly contacts the Global Registry service. Information retrieved from the Registry service is displayed in a dialog. The contact can then be directly added to the contact list:

![Addressbook Result](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-result.png)

RICARDO PLEASE ADD SOME CONTENT HERE
- Resolving UserID -> hyperty
- Interface(?)

While the example described above covers manual discovery and handling of user identifiers,resolving is usually carried out automatically. Here, a user specifies a GUID to contact, e.g. selected from the Addressbook application, which he wants to connect to, e.g. call. The IMaDS framework then automatically resolves a GUID to the user's UserIDs and further to this user's active Hyperty instances. Following this process, a connection is automatically initialized between two users.

A typical usage scenario of the IMaDS services comprise a user Alice, who wants to connect to another user Bob, who is registered in one or more service domains. If required, Alice would query the Discovery component to search for Bob using facts that describe Bob. By resolving Bob’s GUID via the Global Registry, she receives a list of service domains Bob is registered with. As each UserID in the returned dataset also comprises information about the respective service provider’s Domain Registry, Alice can now query the Domain Registry for Bob’s communication endpoint and establish a connection.

### Discovery lib evaluation

The Discovery library allows the discovery of remote Hyperties or Data Objects by using different criteria. To evaluate this component was used the most complex query available that discover Hyperties or Data Objects by profile data. These profile data is related to the information that could be written in the user account at Discovery Service.

Basically, this query translates the profile data into GUIDs by querying the Discovery Service. Then, for each found GUID is executed a query to the Global Registry to get all the user IDs and domains associated. Finally, is executed a query to the Domain Registry for each user ID to get the registered Hyperties or Data Objects.

The methodology used to evaluate the Discovery library was to develop a web application that loads an Hyperty programmed to use the discovery by profile data. For the web application work properly and discover, in this case, the Hyperties associated to the profile data, we had to create an account in Discovery Service with a GUID registered in our Global Registry instance. Then, we started to do the tests, collecting four types of measures in each execution:

  * Time necessary to complete a query to the Discovery Service;
  * Time necessary to complete a query to the Global Registry;
  * Time necessary to complete a query to the Domain Registry;
  * Total time spend in the discovery by profile data.

All tests consisted in one hundred executions of the discovery by profile data, and in each execution we collected all the necessary measures. Below is a chart for each type of measure, having been used the cumulative distribution function (CDF). The variable "n" represents the number of concurrent requests per execution.

![Discovery Service](./discovery%20lib%20evaluation/Discovery%20Service.png)

![Global Registry](./discovery%20lib%20evaluation/Global%20Registry.png)

![Domain Registry](./discovery%20lib%20evaluation/Domain%20Registry.png)

![Complete Query](./discovery%20lib%20evaluation/Complete%20Query.png)



## References

 * [[1]: Friese, Ingo, et al. "Cross-Domain Discovery of Communication Peers. Identity Mapping and Discovery Services (IMaDS)." arXiv preprint arXiv:1704.08957 (2017).](https://arxiv.org/abs/1704.08957)
 * [[2]: Javed, Ibrahim Tariq, et al. "Cross-domain identity and discovery framework for web calling services." Annals of Telecommunications (2017): 1-10.](https://link.springer.com/article/10.1007/s12243-017-0587-2)
