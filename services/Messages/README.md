# Message Service
Author: Chou Heng Ieong
GitHub ID: ieongch0106

## Service Description
The message service is responsible for storing all messages and their information on the platform. This service requires an userId or will send an user data request to user service before performing operations. This service communicates with other services via event bus.

## Service Communication/Interaction
Front end:
The service communicates with the front end service. On the message page, user can see all previous conversation with the another user from `messages/all` call. User can also create message to another user and `messages/create` will be called. During these two calls, useDataRequest event will be sent to the user service via event bus to validate the other user's identify.

`messages/update` updates the content of the message after being sent, `messages/delete` deletes the content of the message after being sent. `messages/get` returns the message given a messageId. Currently they are not integrated into the front end yet.

## Service Endpoints
POST `/messages/create`
Method: POST
URL: /messages/create
use: To create a new message.
BODY:
Request Data Constraints:
{ 	
    senderId: "[unique identifier]",
    receiverId: "[unique identifier]",
    content: "[unicode 64 characters max]"
}
Request Data Example:
{ 	
    senderId: "1234asd321",
    receiverId: "joidfj3479",
    content: "I like your post!"
}

RESPONSE:
201 CREATED: If both users exist Response Data Constraints:
Response Data Constraints:
{ 	
    messageId: "[unique identifier]"
    senderId: "[unique identifier]",
    receiverId: "[unique identifier]",
    content: "[unicode 64 characters max]"
}
Response Data Example:
{ 	
    messageId: "123asd456",
    senderId: "1234asd321",
    receiverId: "joidfj3479",
    content: "I like your post!"
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

POST `/messages/all`
Method: GET
URL: /messages/all
use: return all conversations with another user.
BODY:
Request Data Constraints:
{ 	
    senderId: "[unique identifier]",
    friendId: "[unique identifier]"
}
Request Data Example:
{ 	
    senderId: "4354fdvdfg",
    friendId: "rg;oegktm4"
}

RESPONSE:
200 OK: If both users are found
Response Data Constraints:
[
    {
        messageId: "[unique identifier]"
        senderId: "[unique identifier]",
        receiverId: "[unique identifier]",
        content: "[unicode 64 characters max]"
    },
    {
        messageId: "[unique identifier]"
        senderId: "[unique identifier]",
        receiverId: "[unique identifier]",
        content: "[unicode 64 characters max]"
    },
    .
    .
    .
]
Response Data Example:
[
    {
        messageId: "123asd456",
        senderId: "1234asd321",
        receiverId: "joidfj3479",
        content: "I like your post!"
    },
    {
        messageId: "345fer54",
        senderId: "joidfj3479",
        receiverId: "1234asd321",
        content: "Thanks!"
    },
    .
    .
    .
]

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

GET `/messages/get`
Method: GET
URL: /messages/get
use: return the message given messageId.
BODY:
Request Data Constraints:
{ 	
    messageId: "[unique identifier]",
}
Request Data Example:
{ 	
    messageId: "123asd456",
}

RESPONSE:
200 OK: If messageId is found
Response Data Constraints:
{
    messageId: "[unique identifier]"
    senderId: "[unique identifier]",
    receiverId: "[unique identifier]",
    content: "[unicode 64 characters max]"
}
Response Data Example:
{
    messageId: "123asd456",
    senderId: "1234asd321",
    receiverId: "joidfj3479",
    content: "I like your post!"
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: message not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

PUT `/messages/update`
Method: PUT
URL: /messages/update
use: update the content of the message.
BODY:
Request Data Constraints:
{ 	
    messageId: "[unique identifier]"
    content: "[unicode 64 characters max]"
}
Request Data Example:
{ 	
    messageId: "123asd456",
    content: "hello!"
}

RESPONSE:
200 OK: If messageId is found
Response Data Constraints:
{
    messageId: "[unique identifier]"
    senderId: "[unique identifier]",
    receiverId: "[unique identifier]",
    content: "[unicode 64 characters max]"
}
Response Data Example:
{
    messageId: "123asd456",
    senderId: "1234asd321",
    receiverId: "joidfj3479",
    content: "hello!"
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

DELETE `/messages/delete`
Method: DELETE
URL: /messages/delete
use: delete the message.
BODY:
Request Data Constraints:
{ 	
    messageId: "[unique identifier]"
}
Request Data Example:
{ 	
    messageId: "123asd456",
}

RESPONSE:
200 OK: If messageId is found
Response Data Constraints:
Response Data Constraints:
{
    messageId: "[unique identifier]"
    senderId: "[unique identifier]",
    receiverId: "[unique identifier]",
    content: "[unicode 64 characters max]"
}
Response Data Example:
{
    messageId: "123asd456",
    senderId: "1234asd321",
    receiverId: "joidfj3479",
    content: "hello!"
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
409 CONFLICTED: username already exists.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur


## How to run the service?
Have the port 4003 available.

Docker needs to be installed in order to run this service along with other services. Event bus will be the first one to run up.

For running this service individually, first make sure to do `npm install` in the current directory to install node_modules in needed to run the service. Then you can do `npm start` to start the service.s