# Service Overview

- Author : John Laidler
- Github id : johnlaidler267

## Functionality

The Vote Breakdown service is responsible for handling the results of the mock election associated with each Post/Debate on the site. It allows the front end to create visual displays depicting the vote talley and demographic breakdown of the votes for each candidate. The service listens for the voteCreated event emitted by the Mock Election service, and uses the vote to update the breakdown of votes for each candidate by accessing the user demographic data associated with the vote and storing it in the database.

## Service Interactions

The Vote Breakdown service interacts with the following services:

- Mock Election - The Vote Breakdown service listens for the voteCreated event emitted by the Mock Election service. When a vote is cast, the Vote Breakdown service uses the vote to update the breakdown of votes for each candidate by accessing the user
  demographic data associated with the vote.
- Threads - The Vote Breakdown service uses a postCreated event emitted by the Threads service to create a new vote breakdown for a post.
- Users - The Vote Breakdown service uses the User service to access the user demographic data associated with a vote.
- Event Bus - Recieved postCreated and voteCreated events from the event bus.

## Endpoint Descriptions

The Vote Breakdown service exposes the following endpoints:
<br>

### GET /getBreakdown

The getBreakdown endpoint is used to get the vote breakdown for a given election.

#### Request Data Constraints:

{
electionID: [unique identifier],
}

#### Request Data Example:

{
electionID: 33d392
}

#### Response Data Constraints:

<pre>
{
  electionID varchar(100),
  candidate0  id varchar(100),
              voteCount int,
              under25 int,
              to65 int,
              over65 int,
              numBlack int,
              numHispanic int,
              numAsian int,
              numCaucasian int,
              numRaceOther int,
              totalVotes int,
              numMen int,
              numWomen int,
              numGenderOther int,
  candidate1  id varchar(100),
              voteCount int,
              under25 int,
              to65 int,
              over65 int,
              numBlack int,
              numHispanic int,
              numAsian int,
              numCaucasian int,
              numRaceOther int,
              totalVotes int,
              numMen int,
              numWomen int,
              numGenderOther int
}
</pre>

#### Response Data Example:

<pre>
{
  candidate0  id SpongeBob,
              voteCount 20,
              under25 5,
              to65 15,
              over65 5,
              numBlack 10,
              numHispanic 2,
              numAsian 3,
              numCaucasian 5,
              numRaceOther 0,
              totalVotes 20,
              numMen 10,
              numWomen 10,
              numGenderOther 0,
  candidate1  id Patrick,
              voteCount 15,
              under25 5,
              to65 5,
              over65 5,
              numBlack 5,
              numHispanic 2,
              numAsian 3,
              numCaucasian 1,
              numRaceOther 4,
              totalVotes 15,
              numMen 3,
              numWomen 10,
              numGenderOther 2
}
</pre>

#### 200 SENT: If the electionID exists.

#### 400 BAD REQUEST: If request data is incomplete

#### 404 NOT FOUND: If the election doesn't exist

#### 500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

<br>

### GET /events

The events endpoint is used to listen for events emitted by the event bus. These events include the following:

- voteCreated - This event is emitted by the Mock Election service when a vote is cast. The Vote Breakdown service listens for this event and uses the vote to update the breakdown of votes for each candidate by accessing the user demographic data associated with the vote.
- postCreated - This event is emitted by the Post service when a post is created. The Vote Breakdown service listens for this event and creates a new vote breakdown for the post.

#### Request Data Constraints:

<pre>
{
  "type": [name of an event],
  "data": [JSON]
}
</pre>

##### Request Data Example:

<pre>
{
  "type": voteCreated,
  "data": {
    userId: 1234,
    electionId: fkewf-232jf-4342,
    vote: "Chocolate"
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
  "type": voteCreated,
  "data": {
    userId: 1234,
    electionId: fkewf-232jf-4342,
    vote: "Chocolate"
  }
}
</pre>

#### 200: If event is processed successfully.

## How to Run

To run this service you will need to run npm install, have the port 4009 available, have the event bus started, and then run npm start. Or simply run docker-compose up from the root directory of the project to start all services.
