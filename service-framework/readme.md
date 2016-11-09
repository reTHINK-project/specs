Service Framework
-----------------

The reTHINK Service Framework provides a comprehensive set of application program interfaces (namly APIs) and JavaScript-based libraries to support the development of Hyperties.  As such, the Service Framework is agnostic with respect to the underlying messaging node, modular in design, and to the widest degree agnostic to devices and their operating systems, such as Android, iOS, Raspberry PI, Linux, or Windows. It features a comprehensive set of application program interfaces (APIs) and JavaScript libraries to facilitate the development of Hyperties within the reTHINK architecture.

As such, the reTHINK Service Framework enables the design of the Hyperty Runtime APIs to be developer-friendly, i.e., the latter only have to focus on a few core functionalities, namely:

-	MsgBUS.postMessage() that is used to post messages in order to communicate with other remote Hyperty Instances and with back-end reTHINK Support Services,
-	Syncher API that is used to communicate through the Reporter-Observer communication pattern, and potentially
- the implementation of the hyperty init() function, used to activate the Hyperty Instance with required configuration parameters.

To accomplish this, the Hyperty Service Famework provides:

* Service Framework [Address Factory](address-factory.md)
* Service Framework [Message Factory](message-factory.md)
* Synchronizaiton among Hyperties through the [Syncher API](syncher.md)
* [Discovery library](discovery.md),
* [Identity Manager library](identity-manager.md),
* [Runtime Capabilities Manager](runtime-capabilities-manager.md),
* [QoS interface and LHCB library](qos.md),
* [Storage Manager](storage-manager.md).
