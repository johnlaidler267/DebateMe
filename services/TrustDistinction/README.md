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

This endpoint is used to get the trust score of a user. The request body should contain the following fields:

- userId - The id of the user that the trust score is being retrieved for

### GET /events

This endpoint is used to listen for events emitted by the event bus. These events include the following:

- commentFlagged - This event is emitted by the Moderation service when a comment is flagged. The Trust Distinction service listens for this event and uses the userId associated with the comment to update the reliability score of the user.
-

## How to Run

To run the Trust Distinction service, first make sure that you have the following installed:

- Docker
