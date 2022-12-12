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

This endpoint is used to cast a vote for a candidate. The request body should contain the following fields:

- electionId - The id of the election that the vote is being cast for
- userId - The id of the user that the vote is being cast for
- vote - The vote that is being cast. This should be either a string representing the candidateID.

### GET /getVote

This endpoint is used to get the vote that a user has cast for a given candidate. The request body should contain the following fields:

- userId - The id of the user that the vote is being retrieved for

## How to Run

To run the Mock Election service, first make sure that you have the following installed:

- Docker
