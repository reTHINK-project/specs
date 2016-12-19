#### Resume Data Object Synchronisation for Observers

**Phase 2 New!!**

This Process is performed to resume the synchronisation of Observers data objects. Such resume will be automatically performed everytime the Syncher is instantiated in order to resume the sync of data objects created in previous sessions for the same Hyperty ie the HypertyURL is maintained along the different sessions. In addition, objects can also be resumed and reused from different sessions by explicitely asking the syncher to resume data synchronization that matches a certain criteria e.g. for all objects compliant with a certain data schema that were associated with the UserURL that is currently associated with the Hyperty instance.

![Figure Resume a Sync Data Object](observer-data-object-resume.png)

Steps 1-2: the resume of data synchronisation streams for observers is performed by the syncher.resumeObservers() function that has as an optional input parameter  json object `criteria`:

      ```
      {
      "resource" : <[dataObject](https://github.com/reTHINK-project/specs/blob/master/datamodel/core/data-synch/readme.md)>,
      "identity" : <[userIdentity](https://github.com/reTHINK-project/specs/blob/master/datamodel/core/user-identity/readme.md)>
      }
      ```
If the `criteria` is not provided it is assumed the resume is to be performed for objects previously handled for the same HypertyURL.
Then the syncher asks the local Sync Manager to resume data synchronisation streams sending a  [subscription request message](https://github.com/reTHINK-project/specs/blob/master/messages/data-sync-messages.md#resume-subscriptions-for-the-same-hyperty-url). If provided, the criteria info is attached into the message body.

Steps 3 - 4: if there is no criteria provided, the sync manager uses the storage manager to look for data objects previously stored for the same HypertyURL.

Steps 5 : if a data sync criteria is provided for the user identity currently associated to the Hyperty, the sync manager will look for previously associated data objects even if they were handled in a different Runtime device, by querying the storage manager for such data objects.

Steps 6 - 9: If observer data objects to be resumed were found, a listener for the ObjectURL changes address is added for each one. In addition the data schema is evaluated to check if any children objects may exist and if yes, the observer sandbox listener is added for it.

Steps 10 - 14: then the observer data objects are returned to the syncher. Each returned Observer Object is instantiated and a listener for the ObjectURL changes address is added as well as listeners for children URLs if they exist in the data schema. At the end, a ObserversResumeEvent is fired with the Data Objects instantiated objects.

Steps 15 - 17: then the Syncher will check if each returned data object is updated, if not a [Read Message](https://github.com/reTHINK-project/specs/blob/master/messages/data-sync-messages.md#data-object-read) is sent to the sync manager wich fowards it to Object Reader URL to get the most updated version of the data object. For Reporter data objects the sync manager requests the Registry to update its registration to live *or a object status event is also fired from the syncher to the registry*. For each received message, a ChangesEvent is fired by the Syncher with the most updated version of the data object.

Step 18: If there are no Observers stored data objects a NOT FOUND message is returned .
