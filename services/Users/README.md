# User Service
Author: Chou Heng Ieong
GitHub ID: ieongch0106

## Service Description
The user service is responsible for storing all users data and information on the platform. The majority of other services will require an userId or send an user data request before performing operations. This service communicates with other services via event bus.

## Service Communication/Interaction
Front end:
The service communicates with the front end service. On the sign up form, once user finished all validations and requirements on the page, clicking submit will call `users/register` endpoint in user service passing along with user information. Then a new user will be added to the database.

For a return user, after entering username and password, `users/login` endpoint will be called to validate if they are a valid user in this application.

User can also change their profile information on “Manage Profile” after registered their account. Once submitted it will call `users/update` endpoint and it will update the information of the user.

This services communicates with all services via the event bus. Whenever a service needs to validate a user, get user’s ID and their information such as race, gender, location, etc.  They can send a user data request to the user service via event bus. When user service gets the request, it will send a response along with the information they need to the service via event bus.

## Service Endpoints
POST `/users/register`
Method: POST
URL: /users/register
use: To create a new user.
BODY:
Request Data Constraints:
{ 	
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
}
Request Data Example:
{ 	
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States"
    state: "New York"
    city: "Jamaica"
}

RESPONSE:
201 CREATED: If username not exists Response Data Constraints:
Response Data Constraints:
{ 	
    userId: "[unique identifier]"
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
    DirectMessages: “[array of objects]”
}
Response Data Example:
{ 	
    userId: "123asd456",
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States",
    state: "New York",
    city: "Jamaica",
    DirectMessages: “[]”
}

400 BAD REQUEST: If request data is incomplete
409 CONFLICTED: User already exists.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

POST `/users/login`
Method: POST
URL: /users/login
use: To log in.
BODY:
Request Data Constraints:
{ 	
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
}
Request Data Example:
{ 	
    username: "JSmith98",
    password: "ihatemymom",
}

RESPONSE:
200 OK: If username and password are correct
Response Data Constraints:
{ 	
    userId: "[unique identifier]"
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
    DirectMessages: “[array of objects]”
}
Response Data Example:
{ 	
    userId: "123asd456",
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States",
    state: "New York",
    city: "Jamaica",
    DirectMessages: “[]”
}

400 BAD REQUEST: If request data is incomplete
401 UNAUTHORIZED: user does not exist
404 NOT FOUND: User not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

GET `/users/get`
Method: GET
URL: /users/get
use: return the user information given their userId.
BODY:
Request Data Constraints:
{ 	
    userId: "[unique identifier]",
}
Request Data Example:
{ 	
    userId: "123asd456",
}

RESPONSE:
200 OK: If username and password are correct
Response Data Constraints:
{ 	
    userId: "[unique identifier]"
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
    DirectMessages: “[array of objects]”
}
Response Data Example:
{ 	
    userId: "123asd456",
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States",
    state: "New York",
    city: "Jamaica",
    DirectMessages: “[]”
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

GET `/users/username/get`
Method: GET
URL: /users/get
use: return the user information given their username.
BODY:
Request Data Constraints:
{ 	
    username: "[unicode 32 characters max]",
}
Request Data Example:
{ 	
    username: "JSmith98",
}

RESPONSE:
200 OK: If username and password are correct
Response Data Constraints:
{ 	
    userId: "[unique identifier]"
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
    DirectMessages: “[array of objects]”
}
Response Data Example:
{ 	
    userId: "123asd456",
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States",
    state: "New York",
    city: "Jamaica",
    DirectMessages: “[]”
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

PUT `/users/update`
Method: PUT
URL: /users/update
use: update user information.
BODY:
Request Data Constraints:
{ 	
    userId: "[unique identifier]"
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
}
Request Data Example:
{ 	
    userId: "123asd456",
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States",
    state: "New York",
    city: "Jamaica",
}

RESPONSE:
200 OK: If username and password are correct
Response Data Constraints:
{ 	
    userId: "[unique identifier]"
    username: "[unicode 32 characters max]",
    password: "[unicode 128 characters max]",
    email: "[unicode 256 characters max]",
    age: "[positive integer]"
    gender: "[string type]"
    race: "[string type]",
    country: "[string type]"
    state: "[string type]"
    city: "[string type]"
    DirectMessages: “[array of objects]”
}
Response Data Example:
{ 	
    userId: "123asd456",
    username: "JSmith98",
    password: "ihatemymom",
    email: "jsmith98@gmail.com",
    age: "24",
    gender: "Man",
    race: “African American”,
    country: "United States",
    state: "New York",
    city: "Jamaica",
    DirectMessages: “[]”
}

400 BAD REQUEST: If request data is incomplete
404 NOT FOUND: User not found.
409 CONFLICTED: username already exists.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur


## How to run the service?
Have the port 4008 available.

Docker needs to be installed in order to run this service along with other services. Event bus will be the first one to run up.

For running this service individually, first make sure to do `npm install` in the current directory to install node_modules in needed to run the service. Then you can do `npm start` to start the service.