# Service Overview

- Author : John Laidler
- Github id : johnlaidler267

## Functionality

The purpose of the Trust Distinction service is to provide a reputation score for each user, that is displayed whenever a person posts a comment to a debate. The score is broken down into an engagment score which tracks the users interaction history of the site including comments and posts created, and a reliability score which tracks the upvotes that the user has received for their comments, as well as any times their comments were flagged by the moderation service. The score is calculated by taking the average of the engagment score and the reliability score, and then multiplying it by 100. The score is then rounded to the nearest integer.

The purpose of this trust score is to provide a way for other users to discern the legitimacy of a comment. Since users are mostly anonymous on the site, this score helps to show whether the comment is coming from a user who is active on the site and has a good reputation, or if it is coming from a troll or a bot.

## Service Interactions

The Trust Distinction service interacts with the following services:

- Moderation - The Trust Distinction service listens for the commentFlagged event emitted by the Moderation service. When a comment is flagged, the Trust Distinction service uses the userId associated with the comment to update the reliability score of the user.

## Endpoint Descriptions

### GET /getTrustScore

This endpoint is used to get the trust score of a user.

#### Request Data Constraints:

<pre>
{ 	
    userID varchar(100)
}

</pre>

#### Request Data Example:

<pre>
{ 	
    userID: "user12343"
}
</pre>

#### Response Data Constraints:

<pre>
{
    engagmentScore int,
    reliabilityScore int,
}
</pre>

<pre>
{
    engagmentScore: 0,
    reliabilityScore: 0,
}
</pre>

#### 200 SENT: If the userID exists.

#### 400 INVALID: If there is a problem with the request data.

### GET /events

This endpoint is used to listen for events emitted by the event bus. These events include the following:

- userCreated - This event is emitted when a new user is created. The Trust Distinction service listens for this event and uses the userId associated with the event to create a new entry in the database for the user.
- voteCreated - This event is emitted when a user casts a vote for a candidate. The Trust Distinction service listens for this event and uses the userId associated with the event to update the engagment score of the user.
- commentCreated - This event is emitted when a user creates a comment. The Trust Distinction service listens for this event and uses the userId associated with the event to update the engagment score of the user.
- commentModerated - This event is emitted when a user's comment is moderated. The Trust Distinction service listens for this event and uses the userId associated with the event to update the reliability score of the user.
- commentVoted - This event is emitted when a user upvotes a comment. The Trust Distinction service listens for this event and uses the userId associated with the event to update the reliability score of the user.

#### Request Data Constraints:

<pre>
{
    "type": [name of an event],
    "data": [JSON]
}
</pre>

#### Request Data Example:

<pre>
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
</pre>

#### Response Data Constraints:

<pre>
{
    "type": [name of an event],
    "data": [JSON]
}
</pre>

#### Response Data Example:

<pre>
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
</pre>

#### 200: If event is processed successfully.

## How to Run

To run this service you will need to run npm install, have the port 4009 available, have the event bus started, and then run npm start. Or simply run docker-compose up from the root directory of the project to start all services.
