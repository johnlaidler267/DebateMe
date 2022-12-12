Ethan Stafford - estaff2

Description:
This is the commentVoting service. It is responsbile for storing all the information about upvotes and downvotes on every comment that exists. This is an important part of the user experience as it allows users a quick and easy way to agree or disagree with a comment. It also lets users see how many other people agreed/disagreed with that comment. 

Communication:
This service communicates with the front end service. Anytime a post is clicked on, all the comments on that post are retrieved and the upvotes and downvotes are retrieved for each of those  comments. Additionally, whenever a user clicks on the corresponding upvote or downvote button in the front end, a request is sent to this service. If the user has never voted on that comment, then the vote will be registered. If the user has voted on that comment before, there will only be a change if it is different from their previous vote. Because of this functionality of only allowing 1 vote per user per comment, you must be logged in for this service to work in the front end. 

This service also communicates with the comment service. The comment service orders the comments by number of votes on them, and to get tht info it must send a request to this service. 

This service also communicates with the trustDistiniction service via the event bus. Everytime a vote is created/changed, that event is sent to the event bus. The trustDistiniction service recieves this and records it because it is a good measure of activity by that user.

Run Instructions: To run this service from scratch you will need to run npm install, have the port 4002 available, and then run npm start. 

End points: 