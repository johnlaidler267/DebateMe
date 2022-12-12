TEMP: REMEMBER COMMAND docker system prune -a
Ethan Stafford - estaff2

This is the comment service. It is resposible for storing all information about comments that are made on debate posts. This is a major part of the user experience as it is where many different users can communicate with each other.  

The service communicates with the front end service. Anytime a post is clicked on, a request is sent to retrieve all the comments associated with that postId. Before being sent, this service sends a request to the commentVoting service. It retrieves the total number of votes for each of the comments on that post and orders them from highest to lowest. This effectivley orders comments by level of engagement. 

Additionally, every post has an area where users can enter a comment. Whenever someone hits the submit button, this service recieves a request to create that comment. 

This services also communicates with 2 services via the event bus. Everytime a comment is created, that event is sent to the event bus. The trustDistiniction service recieves this and records it because it is a good measure of activity by that user. The moderation event also recieves this event in order to see if it's acceptable. This service subscribes to the commentModerated event, so after the comment has been moderated this service will recieve it, and if the comment was rejected it will be deleted from the database. 


Endpoints: 

Use: To create a comment
URL: /addComment
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
