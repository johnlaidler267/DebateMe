# Service Overview

- Author : John Laidler
- Github id : johnlaidler267

## Functionality

The Mock Election service is responsible for handling the voting process for the mock election associated with each Post/Debate on the site. The purpose of the election is to provide a way for users to cast their vote for a given candidate. Every time a vote button is pressed, a vote is cast for the candidate associated with that button. The service then stores the vote in the database, and emits a voteCreated event to the event-bus so that the ElectionBreakdown service can use the vote to update the breakdown of votes for each candidate.

## Service Interactions

The Mock Election service interacts with the following services:
VoteBreakdown - The Mock Election service emits a voteCreated event to the event-bus when a vote is cast. The VoteBreakdown service listens for this event and uses the vote to update the breakdown of votes for each candidate by accessing the user demographic data associated with the vote.

## Endpoint Descriptions

### POST /vote

This endpoint is used to cast a vote for a candidate.

#### Request Data Constraints:

<pre>
{ 	
    electionID varchar(100),
    userID varchar(100),
    vote varchar(100)
}
</pre>

#### Request Data Example:

<pre>
{ 	
    electionID "van-11-343-ffffgg-3343",
    userID "user12343",
    vote "Vanilla"
}
</pre>

<br>

#### Response Data Constraints:

<pre>
{ 	
    electionID varchar(100),
    userID varchar(100),
    vote varchar(100)
}
</pre>

#### Response Data Example:

<pre>
{ 	
    electionID "van-11-343-ffffgg-3343",
    userID "user12343",
    vote "Vanilla"
}
</pre>

#### 200 SENT: If the electionID and userID exist.

#### 400 BAD REQUEST: If request data is incomplete.

#### 404 NOT FOUND: If the election/user doesn't exist, or if the user hasn’t voted in that election.

#### 500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

<br>

### GET /hasVoted

This endpoint is used to check if a user has voted in a given election.

#### Request Data Constraints:

<pre>
{ 	
    electionID varchar(100),
    userID varchar(100)
}
</pre>

#### Request Data Example:

<pre>
{
    electionID "van-11-343-ffffgg-3343",
    userID "user12343",
    vote "Vanilla"
}
</pre>

#### 201 SENT: If the electionID and userID exist.

#### Response Data Constraints:

<pre>
{ 	
    hasVoted boolean
}
</pre>

#### Response Data Example:

<pre>
{
    hasVoted true
}
</pre>

#### 400 BAD REQUEST: If request data is incomplete.

#### 404 NOT FOUND: If the election/user doesn't exist, or if the user hasn’t voted in that election.

<br>

## How to Run

To run this service you will need to run npm install, have the port 4004 available, have the event bus started, and then run npm start. Or simply run docker-compose up from the root directory of the project to start all services.
