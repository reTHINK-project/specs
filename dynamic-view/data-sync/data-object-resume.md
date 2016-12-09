#### Resume Data Object Synchronisation for Reporters and Observers

**Phase 2 New!!**

This Process is performed everytime the Syncher is instantiated in order to resume the sync of data objects created in previous sessions of Hyperties.

![Figure Resume a Sync Data Object](data-object-resume.png)

Steps 1 - 2: The resume process starts by [querying the local Sync Manager](https://github.com/reTHINK-project/specs/blob/master/messages/data-sync-messages.md#query-the-sync-manager-about-observer-and-reporter-objects-to-be-resumed) about locally stored data objects.

Steps 3 - 8: If there are stored data objects, they are returned in the response body. Each returned Observer Object is instantiated and a listener for the ObjectURL changes address is added. In the same way, for each returned Reporter Object is instantiated and a listener for the ObjectURL read address is added. At the end, a ResumeEvent is fired with the Data Objects instantiated objects.

Steps 9 - 14: then the Syncher will check if each returned data object is updated, if not a [Read Message](https://github.com/reTHINK-project/specs/blob/master/messages/data-sync-messages.md#data-object-read) is sent to the sync manager wich fowards it to Object Reader URL to get the most updated version of the data object. For Reporter data objects the sync manager requests the Registry to update its registration to live *or a object status event is also fired from the syncher to the registry*. For each received message, a ChangesEvent is fired by the Syncher with the most updated version of the data object. 

Step 15: If there are no stored data objects a NOT FOUND message is returned and no additional process is performed.
