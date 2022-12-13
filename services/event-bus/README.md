Ethan Stafford - estaff2 
John Laidler- johnlaidler267
Chou Heng (Jack) Ieong - ieongch0106

This is the event bus. It is responsible for orcherstrating communication and exchanging events between services. It supports dynamic registration so that services only recieves events that they care about. 

The way this works is that other services will send a request to the subscribe end point on startup (or any time if they want). The information they send will contain the port number, the name of the service per the dockercompose file, and all the events they want to subscribe to. Each event will have 2 assocaited arrays, one to store the ports that want that event, and one to store the names of the services that want that event. 
When the event bus receives an event via the /events endpoint, it will use these arrays to send the event to all the services that want to recieve it. 
Due to the dynamic registration component, the event bus has the ability to communicate with every service in the project. For more info on how each service uses the event bus for communication, please refer to the README.md file within every service. 

Endpoints:
URL: /subscribe
METHOD: POST
BODY:
Request Data Constraints:

{"port": number 4001 to 4009,
"name": name of a service,
"eventArray": [names of events]}
Request Data Example:
{"port": 4001,
"name": comments.
"eventArray": ["commentModerated", "postModerated"]}
Response Data: 
You will recieve a message that says "Subscribed successfully!" with the status 200.

URL:/events
METHOD: POST
BODY:
Request Data Constraints:
{"type": [name of an event],
 "data": [JSON]
}
Request Data Example:
{
    "type": commentCreated,
    "data": {
        userId:  1234
        parentId: 5678
        commentId: 4912
        postId: 5678
        content: insightful comment
    }
}
Respose Data Constraints: 
{"type": [name of an event],
 "data": [JSON]
}
Response data examples:
{
    "type": commentCreated,
    "data": {
        userId:  1234
        parentId: 5678
        commentId: 4912
        postId: 5678
        content: insightful comment
    }
}

