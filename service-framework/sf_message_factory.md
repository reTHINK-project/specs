### Message and MessageFactory

![Message Module Package](message module.png)
####Class Message
The Message Class has following class attributes:
* ```id``` - the identifier to be used to associate Response messages to the initial request message
* ```type``` - from MessageType Enumeration class/variable
* ```contextID``` - GUID used to identify the context for example communication session
* ```from``` - URL of the Hyperty instance or assoiciated User
* ```to``` - one or more URLs of the recipeints
* ```resourceURL``` - the URL of the reTHINK Data Object resource associated with this message. Used for routing purposes.
* ```messageBody``` - from the MessageBody data object

####MessageType (Enumeration)
``` 
var MessageType = new enums.Enum("CREATE", "UPDATE", "DELETE", "READ", "SUBSCRIBE", "UNSUBSCRIBE", "RESPONSE");
```

####Class MessageBody
* ```idToken``` - optional attribute (JWT) for Identity assertion purpose
* ```accessToken``` -  optional attribute (JWT) for access control purpose

#####Class CreateMessageBody extends MessageBody
* ```policyURL``` - URL from where to download the access policy control
* ```value``` - JSON formatted data to create (TODO: has this been specified on any document so far?)
 
#####Class ReadMessageBody extends MessageBody
* ```attribute```- attribute in the object to be read
* ```value``` - value of the read attribute

#####Class DeleteMessageBody extends MessageBody
* ```attribute```- attribute in the object to be deleted

#####Class UpdateMessageBody extends MessageBody
* ```attribute```- attribute in the object to be modified
* ```value``` - new value of the attribute

#####Class ResponseMessageBody extends MessageBody
* ```code```- a response code complaint to HTTP response codes (RFC7231)
* ```value``` - data value in JSON format (used as value to read message requests)

#####Class ResponseCode
Enumeration of all response codes according to RFC7231

#### Class MessageFactory
The MessageFactory creates messages according to the [Message Data Model](https://github.com/reTHINK-project/architecture/tree/master/docs/datamodel/message) to be sent through the Runtime Message Bus. 

####Methods
* ```constructor(...)```
* ```createMessageRequest(URL.URLList to, MessageType type, Object extraHeaders, MessageBody body )```
* ```createDeleteMessageRequest(Message data)```
* ```createUpdateMessageRequest(Message data, String attribute, String value)```
* ```createReadMessageRequest(Message data, String attribute, String criteria, String criteriaSyntax)```
* ```createResponse(Message data, ResponseCode code)```
* ```getHeader(Message data, String key) returns String```
* ```getBody(Message data): returns JSON object```
