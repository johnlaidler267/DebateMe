# Service Overview

- Author : John Laidler
- Github id : johnlaidler267

## Functionality

The Vote Breakdown service is responsible for handling the results of the mock election associated with each Post/Debate on the site. It allows the front end to create visual displays depicting the vote talley and demographic breakdown of the votes for each candidate. The service listens for the voteCreated event emitted by the Mock Election service, and uses the vote to update the breakdown of votes for each candidate by accessing the user demographic data associated with the vote and storing it in the database.

## Service Interactions

The Vote Breakdown service interacts with the following services:

Mock Election - The Vote Breakdown service listens for the voteCreated event emitted by the Mock Election service. When a vote is cast, the Vote Breakdown service uses the vote to update the breakdown of votes for each candidate by accessing the user
demographic data associated with the vote.
Threads - The Vote Breakdown service uses a postCreated event emitted by the Threads service to create a new vote breakdown for a post.
Users - The Vote Breakdown service uses the User service to access the user demographic data associated with a vote.
Event Bus - Recieved postCreated and voteCreated events from the event bus.

## Endpoint Descriptions

The Vote Breakdown service exposes the following endpoints:

### GET /getBreakdown

The getBreakdown endpoint is used to get the vote breakdown for a given election. The request body should contain the following fields:

- electionID - The id of the election that the vote breakdown is being retrieved for

### GET /events

The events endpoint is used to listen for events emitted by the event bus. These events include the following:

- voteCreated - This event is emitted by the Mock Election service when a vote is cast. The Vote Breakdown service listens for this event and uses the vote to update the breakdown of votes for each candidate by accessing the user demographic data associated with the vote.
- postCreated - This event is emitted by the Post service when a post is created. The Vote Breakdown service listens for this event and creates a new vote breakdown for the post.

## How to Run
