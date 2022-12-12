Ethan Stafford - estaff2 

Description: 
This is the moderation service. It is resposnible for moderating any new comments or posts and then storing info for each user with their accepted and rejected content. This is important for the user as it minimizes the amount of offensive content. 

Communcation: 
This service largely communicates with services through the event bus. It is listening for commentCreated and postCreated events. When it recieves these it scans them and will determine if it's acceptable or not. Once it's reached a conclusion, it will send a commentModerated or postModerated event. This event is then used by the comment and thread service to determine if the associated entry should stay or be deleted. The commentModerated event is also recieved by the trustDistinction service in order to see if a user has had a comment or post rejected. 

Run Instructions: To run this service you will need to run npm install, have the port 4005 available, have the event bus started, and then run npm start. 