## Addressbook

The Addressbook is a web based application included in the ReThink runtime that allows users to maintain one's identity. The Addressbook is reachable in the browser at localhost. The main screen shows a list of contacts and means to query for and add users:

![Addressbook Create GUID](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-main.png)

At first use, a new GUID needs to be created and registered in the Global Registry service. This is automated via the option "generate GUID" in the "Account"-menu. The process registers a new GUID and publishes it in in the Global Registry service along with information specified in the registration process.

![Addressbook Info](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-createguid.png)

To view and edit one's contact details, users can use the "get my information" function that displays a dialog with all details of the user's account. Changes can be made directly in the dialog and the changed account details can be directly sent to the Global Registry:

![Addressbook Info](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-info.png)

When selecting contacts in the Addressbook, available information for the selected contact is shown. This includes the username and ids: 

![Addressbook Details](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-details.png)

The Addressbook further allows to search for users either by a known GUID or arbitrary contact details:

![Addressbook Query](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-query.png)

In case the GUID of the contact is known, the Global Registry service is contacted directly where information from is displayed in a dialog. The contact can then be directly added to the contact list:

![Addressbook Result](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-result.png)

In case the GUID is not known, the Discovery service of the ReThink framework can be queried. Here, all found contacts matching the search query are returned and can be added directly to the contact list:

![Discovery Result](https://github.com/reTHINK-project/specs/blob/master/tests/discovery/ab-result.png)
