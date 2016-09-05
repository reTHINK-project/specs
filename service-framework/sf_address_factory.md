### Address Resource Factory

The Address Resource Factory creates the different types of URLs required as specified [here](https://github.com/reTHINK-project/architecture/tree/master/docs/datamodel/address). It is compliant with the API described [](https://url.spec.whatwg.org/#api)

#####Address Data Model

All the attributes below are internally getter/setters functions. In the setter functions value validation will be included.

* ```href``` - It allows to get and set the complete URL string.
* ```scheme``` - It allows to get and set the scheme of the URL. In traditional URL it defines the protocol for which the URL was intended for. It can be any of the schemes defined in reTHINK: domain, hyperty, hyperty-catalogue, hyperty-runtime, comm, ctxt, acct, user-uuid and user. 
* ```username``` - It allows to get and set the username of the URL.
* ```password``` - It allows to get and set the password of the URL.
* ```host``` - It allows to get and set the host of the URL.
* ```hostname``` - It allows to get and set the hostname of the URL.
* ```port``` - It allows to get and set the port of the URL.
* ```pathname``` - It allows to get and set the pathname of the URL.
* ```search``` - It allows to get and set the query string of the URL.
* ```searchParams``` - It allows to get the query string of the URL according to the interface [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams)
* ```hash``` - It allows to get and set the fragment identifier of the URL.

###Functions
* ```constructor(url, base)``` - Constructor function
* ```schemeValidation()``` - this function validates if the URL is syntactically compliant with any of the schemes defined for reTHINK. It will also validate standard schemes.

###Static functions
* ```urlToASCII(domain)``` - This static function return the URL in ASCII code (to be discussed if it's necessary)
* ```urlToUnicode(domain)``` - This static function returns the URL in unicode (to be discussed if it's  necessary)


-----------------------
Define and specify functionalities from the [dynamic views](https://github.com/reTHINK-project/core-framework/tree/master/docs/specs/runtime/dynamic-view) that relate in creating and managing the Data Objects.
