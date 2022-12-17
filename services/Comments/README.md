TEMP: REMEMBER COMMAND docker system prune -a
Ethan Stafford - estaff2

Description:
This is the comment service. It is resposible for storing all information about comments that are made on debate posts. This is a major part of the user experience as it is the way many different users can communicate with each other.

Communication:
The service communicates with the front end service. Anytime a post is clicked on, a request is sent to retrieve all the comments associated with that postId. Before being sent, this service sends a request to the commentVoting service. It retrieves the total number of votes for each of the comments on that post and orders them from highest to lowest. This effectivley orders comments by level of engagement.

Additionally, every post has an area where users can enter a comment. Whenever someone hits the submit button, this service recieves a request to create and store that comment.

This services also communicates with 2 services via the event bus. Everytime a comment is created, that event is sent to the event bus. The trustDistiniction service recieves this and records it because it is a good measure of activity by that user. The moderation event also recieves this event in order to see if it's acceptable. This service subscribes to the commentModerated event, so after the comment has been moderated this service will recieve it, and if the comment was rejected it will be deleted from the database.

Run Instructions: To run this service from scratch you will need to run npm install, have the port 4001 available, have the event bus started, and then run npm start.

Endpoints:

Use: To create a comment
URL: /addComment
METHOD: POST
BODY:
Request Data Constraints:
{ "userId" : "[unique identifier]",
"username": "[unicode 50 chars max]"
"parentId" : "[unique identifier]",
“postId: "[unique identifer]",
"parentId": "[postId or commentId]",
"content" : "[unicode 130 characters max]" }
Request Data Example:
{ "userId" : "5abc52dd12",
"username": "Ethan Stafford",
"parentId" : "bfe3a44ca9",
“postId”: "56asd3f",
"parentId":"56asd3f",
"content" : "Insightful political comment “}

RESPONSE:
201 CREATED: If comment is successfully created. Response Data Constraints:
{ "commentId" : "[unique identifier]",
"parentId" : "[unique identifier]",
"userId" : "[unique identifier]",
"userName" : "[unicode 50 characters max]",
"parentId" : "[unique identifier]",
"content" : "[unicode 130 characters max]" }
Response Data Example:
{ "commentID" : "caf4b55db2",
"postId" : "bfe3a44ca9",
"parentID" : "bfe3a44ca9",
"userID" : "5abc52dd12",
"userName" : "Ava Lovelace",
"content" : "Time is a figment of our imagination" }
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

Use: To get all comments on a post
URL: /comments/get
METHOD: GET
BODY:
Request Data Constraints:
{ "postID" : "[unique identifier] }
Request Data Example:
{ “postID”: 123456}

RESPONSE:
200: If comments are retrieved successfully. Response Data Constraints:
[
{ "commentId" : "[unique identifier]",
"parentId" : "[unique identifier]",
"userId" : "[unique identifier]",
"userName" : "[unicode 64 characters max]",
"parentId" : "[unique identifier]",
"content" : "[unicode 128 characters max]" }]
Response Data Example:
[{ "commentID" : "caf4b55db2",
"postId" : "bfe3a44ca9",
"parentID" : "bfe3a44ca9",
"userID" : "5abc52dd12",
"userName" : "Ava Lovelace",
"content" : "Time is a figment of our imagination" }]
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

Use: To get all comments for a user
URL: /comments/user
METHOD: GET
BODY:
Request Data Constraints:
{ "userId" : "[unique identifier] }
Request Data Example:
{ “userId”: 123456}

RESPONSE:
200: If comments are retrieved successfully. Response Data Constraints:
[
{ "commentId" : "[unique identifier]",
"parentId" : "[unique identifier]",
"userId" : "[unique identifier]",
"userName" : "[unicode 64 characters max]",
"parentId" : "[unique identifier]",
"content" : "[unicode 128 characters max]" }]
Response Data Example:
[{ "commentID" : "caf4b55db2",
"postId" : "bfe3a44ca9",
"parentID" : "bfe3a44ca9",
"userID" : "5abc52dd12",
"userName" : "Ava Lovelace",
"content" : "Time is a figment of our imagination" }]
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

Use: To recieve events from the event bus
URL: /events
METHOD: POST
BODY:
Request Data Constraints:
{"type": [name of an event],
"data": [JSON]
}
Request Data Example:
{
"type": commentModerated,
"data": {
userId: 1234,
username: Ethan,
parentId: 5678,
commentId: 4912,
postId: 5678,
content: insightful comment
}
}

RESPONSE:
200: If event is processed successfully. Response Data Constraints:
Response Data Constraints:
{"type": [name of an event],
"data": [JSON]
}
Response Data Example:
{
"type": commentModerated,
"data": {
userId: 1234,
username: Ethan,
parentId: 5678,
commentId: 4912,
postId: 5678,
content: insightful comment
}
}

Exceeds Expectations: I believe this service exceeds expectations for a couple reasons. First I believe that the neccessity to interact with a large variety of services adds diffuculty. The ordering of comments by number of votes adds good functionality to the front end. I also think that my documentation is fairly thorugh for this service.
