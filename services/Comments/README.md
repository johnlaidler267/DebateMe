TEMP: REMEMBER COMMAND docker system prune -a
Ethan Stafford - estaff2

This is the comment service. It is resposible for storing all information about comments that are made on debate posts including userId, postId, the content, and the parentId for determining if the comment was directly on another post or another comment. 

This service communicates with the trustDistinction service everytime a comment is created because this is a good measure of activity by that user. 

Endpoints: 

Use: To create a comment
URL: /comments/create
METHOD: POST
BODY:
Request Data Constraints:
{ "userId" : "[unique identifier]",
  "parentId" : "[unique identifier]",
  “postId: "[unique identifer"],
  "content" : "[unicode 128 characters max]" }
Request Data Example:
{ "userId" : "5abc52dd12",
  "parentId" : "bfe3a44ca9",
  “postId”: "56asd3f", 
  "content" : "Insightful political comment “}
RESPONSE:
201 CREATED: If comment is successfully created. Response Data Constraints:
{ "commentID" : "[unique identifier]",
  "parentID" : "[unique identifier]",
 “parentType”: “comment” or “post” 
  "userID" : "[unique identifier]", 
  "userName" : "[unicode 64 characters max]",
  "content" : "[unicode 128 characters max]" }
Response Data Example:
{ "commentID" : "caf4b55db2",
  "parentID" : "bfe3a44ca9",
  “parentType”: “comment” or “post”,
  "userID" : "5abc52dd12", 
  "userName" : "Ava Lovelace",
  "content" : "Time is a figment of our imagination" }
400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: If the user doesn't exist OR If the parent doesn't exist.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

Use: To get a comment
URL: /comments/get
METHOD: GET
BODY:
Request Data Constraints:
{ "commentID" : "[unique identifier] }
Request Data Example:
{ “commentID”: 123456}
RESPONSE:
201 SENT: If the comment exists. Response Data Constraints:
{ "commentID" : "[unique identifier]",
  "parentID" : "[unique identifier]",
 “parentType”: “comment” or “post” 
  "userID" : "[unique identifier]", 
  "userName" : "[unicode 64 characters max]",
  "content" : "[unicode 128 characters max]" }
Response Data Example:
{ "commentID" : "caf4b55db2",
  "parentID" : "bfe3a44ca9",
  “parentType”: “comment” or “post”,
  "userID" : "5abc52dd12", 
  "userName" : "Ava Lovelace",
  "content" : "Time is a figment of our imagination" }
400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: If comment doesn’t exist
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur
