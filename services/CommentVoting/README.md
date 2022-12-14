Ethan Stafford - estaff2

Description:
This is the commentVoting service. It is responsbile for storing all the information about upvotes and downvotes on every comment that exists. This is an important part of the user experience as it allows users a quick and easy way to agree or disagree with a comment. It also lets users see how many other people agreed/disagreed with that comment. 

Communication:
This service communicates with the front end service. Anytime a post is clicked on, all the comments on that post are retrieved and the upvotes and downvotes are retrieved for each of those  comments. Additionally, whenever a user clicks on the corresponding upvote or downvote button in the front end, a request is sent to this service. If the user has never voted on that comment, then the vote will be registered. If the user has voted on that comment before, there will only be a change if it is different from their previous vote. Because of this functionality of only allowing 1 vote per user per comment, you must be logged in for this service to work in the front end. 

This service also communicates with the comment service. The comment service orders the comments by number of votes on them, and to get tht info it must send a request to this service. 

This service also communicates with the trustDistiniction service via the event bus. Everytime a vote is created/changed, that event is sent to the event bus. The trustDistiniction service recieves this and records it because it is a good measure of activity by that user.

Run Instructions: To run this service from scratch you will need to run npm install, have the port 4002 available,start the event bus, and then run npm start. 

End points: 
Use: To register a vote
URL: /comments/vote
METHOD: POST
BODY:
Request Data Constraints:
{ "userId" : "[unique identifier]",
  "commentId" : "unique identifier]",
  "ownerId" : "[unique identifer]",
  "vote": "up" or "down" }
Request Data Example:
{ "userId" : "123456",
  "commentId" : "128123",
  "ownerId" : "7823513",
  "vote": "up" }

RESPONSE:
201 CREATED: If comment is successfully created. Response Data Constraints:
{ "commentId" : "[unique identifier]",
  "ownerId" : "[unique identifier]",
  "upvotes" : "[array of unique identifers]", 
  "downvotes" : "[array of unique identifers]"}
Response Data Example:
{ "commentId" : "123135",
  "ownerId" : "132123f23]",
  "upvotes" : "[45345345, 134123]", 
  "downvotes" : "[671241]"}
200 No Changes: If there has been no change in votes(ex. user hit upvote button twice, the second one will recieve 200 No Changes)
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

Use: To retrieve votes on a comment
URL: /comments/getVotes
METHOD: POST
BODY:
Request Data Constraints:
{ 
  "commentId" : "unique identifier]"}

Request Data Example:
{ 
  "commentId" : "128123"} 

RESPONSE:
200 : If comment votes are succesfully retrived. Response Data Constraints:
{ "commentId" : "[unique identifier]",
  "ownerId" : "[unique identifier]",
  "upvotes" : "[array of unique identifers]", 
  "downvotes" : "[array of unique identifers]"}
Response Data Example:
{ "commentId" : "123135",
  "ownerId" : "132123f23]",
  "upvotes" : "[45345345, 134123]", 
  "downvotes" : "[671241]"}
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
        userId:  1234,
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
        userId:  1234,
        username: Ethan,
        parentId: 5678,
        commentId: 4912,
        postId: 5678,
        content: insightful comment
    }
}

Exceeds expectations: I believe this code exceeds expectations for a couple reasons. First off I implemented the ability for the service to only change the database if that user has not had the same vote before on a specfic comment which adds a layer of robustness. I also feel my documentation is pretty thorough for this service. 


