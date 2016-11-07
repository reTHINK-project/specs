Service Framework
-----------------

The reTHINK Service Framework provides a comprehensive set of application program interfaces (namly APIs) and JavaScript-based libraries to support the development of Hyperties.  As such, the Service Framework is agnostic with respect to the underlying messaging node, modular in design, and to the widest degree agnostic to devices and their operating systems, such as Android, iOS, Raspberry PI, Linux, or Windows. It features a comprehensive set of application program interfaces (APIs) and JavaScript libraries to facilitate the development of Hyperties within the reTHINK architecture.

As such, the reTHINK Service Framework enables the design of the Hyperty Runtime APIs to be developer-friendly, i.e., the latter only have to focus on a few core functionalities, namely:

-	MsgBUS.postMessage() that is used to post messages in order to communicate with other remote Hyperty Instances and with back-end reTHINK Support Services, 
-	Syncher API that is used to communicate through the Reporter-Observer communication pattern, and potentially
- the implementation of the hyperty init() function, used to activate the Hyperty Instance with required configuration parameters.

To accomplish this, the Hyperty Service Famework provides:

-	factory functionalities for creating and managing the reTHINK Messages and Data Objects
-	templates for creating Hyperty Data Objects for the basic specified Hyperty Types (Communication, Identity, Context)






*to be reviewed with links to existing documented framework libs. Missing Documentation for Discovery and IdentityManager lib*


Thus, the Hyperty Service Framework should provide:



In addition, the Hyperty Service Framework will provide JavaScript libraries to speed up the implementation of conversational services (audio, video, chat, screen sharing) and context enabled services (IoT, context delivery, location). These services will be fully implemented in the scenarios implementation tasks and demonstrated in reTHINK testbes. The requirements from a software perspective have been defined in section 2.4.

A preliminary analysis of functionalities to be provided by the framework will be discussed and a high level capability set for the Framework will be presented in the next sections. For this input from three different areas of the reTHINK project will be examined namely:

-	Uses Cases as specified in WP1 Task1.1
-	Data Models as specified in WP2 Task 2.3
-	Interface Design as specified in WP2 Task 2.4

### Use Cases

D1.1 – “Use Cases and Sustainable Business Models” specified 15 user scenarios from which 5 have been selected as the main scenarios for the development of Hyperties in WP5. Details of these user scenarios can be found in D1.1.

-	Daily life in a Smart City – Human-To-Human Communication
-	Daily Life In A Smart City – Individual Contextual Services
-	Hotel Guest Web Application* Apartment Rental Monitoring And Control Application
-	Smart Enterprise –Contextual Enriched Communication in Smart Enterprises

From the above user scenarios specific actors/roles, requirements and use cases where identified and specified. These functionalities include:

-	Communication Service: the Hyperty Runtime already provides an API for H2H and M2M communication. Developers will be able to use this service directly from the Hyperty Runtime API
-	Identity Service: a provider mechanism to access internal reTHNK IdP services or external IdPs (Google, Facebook, etc.)
-	Data Storage functions: for storing persistent data
-	Location functions: to access device specific context (e.g. GPS) to be used as context for different services
-	User Entity Management: to manage one or multiple user profiles*Notification service: for notifying triggered events

For the Service Framework focus will be laid on functionalities that are not available on other open source JavaScript libraries.

### Data Models

In D2.2 Data models were specified from 3 different points of view - the service provider view, developer view and consumer view. For the Service Framework, focus will be laid only the developer view. The identified data models for the developer's perspective include the following:

**Hyperty Descriptor Model**: As described in D2.2, the Hyperty data model is used to model different types of Hyperty provided by the Service Provider. The Hyperty descriptor contains sets of data objects with information to the HypertyCatalogueURL, the type of Hyperty (communicator, identity or context), policies, constraints and configuration parameters. The Service Framework will provide JavaScript object templates specifying the Hyperty Descriptor Data Objects and extending them to create new Hyperty Types.

**User Identity Model**: This data model models a user entity within the reTHINK infrastructure. It has a unique identifier (UserUUIDURL) and multiple identifier Types (UserURL). The user entity is characterized by its profile (UserProfile) which may include information associated to the user : profile page URL, username, birthdate, picture, etc. To provide management functionalities to the developers to the reTHINK Identity management, the Hyperty Framework will need to interface with the Protocol Stub for Identity management.

**Context Model**: The context model is used to model different media types for representing simple sensors and device meta data which can be transmitted in a protocol such as CoAP or HTTP. The data model contains context information such as id, context type, time, tag and a list of context values which can be used in the M2M reTHINK uses cases. The Service Framework will provide factory functionalities for creating and managing these data objects.

**Communication Model**: The communication data model will be to model communications within the retHINK architecture for messaging and communicator Hyperties. The data model includes information for identifying a communication (id, owner, duration, etc.), the status of the communication (pending, open, closed, failed, paused), a list of participants (identity), the quality, the connection data object (webRTC connection) and message. The Service Framework should provide a set of functionalities for creation and management of the sessions. Some of these functionalities will be provided by the Hyperty Runtime. It is still to be determined to what abstraction level this should be made available to developers.

**Message Model** : This model specifies messages exchanged between Hyperties. It uses the Reporter-Observer communication pattern to create and synchronize object state changes amongst each other. The Hyperty Runtime includes this functionality which will be exposes to the developers through factory creation interfaces.

**Address Model** : Different address URL has been proposed for the reTHNK platform with respect to the different components. For example user:/// for Idp, hyperty-runtime:/// for the Hyperty Runtime and hyperty:/// for the Hyperty Instance. The Service Framework will provide factory classes for creation of different address URL types.

### Interfaces

D2.2 specified network interfaces (Registry, Catalogue, Identity Management, Messaging service) for performing CRUD operations over various Data Objects. The Proto-on-the-fly and the protocol stubs from the different components could directly be used here without implementing extra functionalities to the Service Framework.
