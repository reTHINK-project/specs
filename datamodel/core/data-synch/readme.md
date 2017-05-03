### Sync Data Object Model


![Sync Data Object Model](SyncDataObject.png)

The SyncDataObject Model is used to specify the JSON format used in the [Reporter-Observer data synchronisation communication mechanism](../../../messaging-framework/p2p-data-sync.md) used to support Hyperty Interoperability at run time.

#### SyncObject

Is the abstract class for any data object to be synchronized. It contains metadata about the object to be synchronised and the data itself.

**url** is the DataObject URL which scheme is defined in the json-schema descriptor of the DataObject

**Reporter** contains the Reporter Hyperty URL

**schema** contains the CatalogueURL for the JSON Schema describing the Sync Object

**runtimeUrl** contains the RuntimeURL where the Sync Object is hosted

**created** data object creation time

**name** is an identifier of the Data Object that is used for discovery purposes

**description** textual description of the data object (optional)

**tags** strings that can be used to classify the data object (optional)

**resources** the types of [Hyperty Resources](../hyperty-resource/readme.md) supported by the data object.

**observerStorage** is a boolean used by the Sync Manager of the Observer runtime to decide if Observer can store (`true`) or not (`false`) the data object.

**public** is a boolean used by the Hyperty handling reading requests to decide who can read the Object.

**mutualAuthentication** is a boolean used by the Policy Engine to decide if the Object sync data flows should be encrypted (true) or not (false).

#### SyncData

Is the abstract class for the actual data to be synchronized. Besides the real data to be synchronised it contains:

**lastModified** last time the data object was changed

**cseq** is an integer that is incremented every time the object is updated. To be used to order changes in the object when needed. Useful when sync streams are resumed by Observers.


#### SyncObjectParent

Is an Abstract class for composite SyncObject. It can either contain a set of containers of Childs called  SyncObjectChildren or a list of Childs (SyncOjectChild).



#### SyncObjectChildren

Contains the **children** attribute that is a list of SyncObjectChild URLs

#### SyncObjectChild

Is a SyncObject that can be created by an observer of the SyncObjectParent.

The **url** attribute inherited from SyncDataObject class contains, `<SyncObjectParentURL>/children/<childreName>/<reporter-instance-indentifier>#<cseq>` where,

 `<reporter-instance-indentifier>` is the path from the Hyperty URL of the Reporter, ie the creator, of the SyncObjectChild. Note that HypertyURL is `hyperty://<domain>/<reporter-instance-indentifier`.

 `<cseq>` is an integer that is incremented everytime a new SyncObjectChild is create by the same Hyperty.
