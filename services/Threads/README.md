# Thread Service
Author: Chou Heng Ieong
GitHub ID: ieongch0106

## Service Description
The thread service is responsible for storing all posts' information on the platform. Services like comments, moderation, commentVoting and mockElection will depend on this service before performing operations. This service communicates with other services via event bus.

## Service Communication/Interaction
Front end:
This service communicates with the front end service. When a user arrives on the home page, `posts/all` endpoint is called to fetch all posts from the user database and render them on the page. By clicking on the post, it will redirect to the post by calling `posts/get` which contain all information of that particular post.

Creator of the post can also update or delete the post they have created by calling `posts/update` and `post/delete` endpoints. It can update information of the post or delete the post.

This service communicates with other services via event bus. This service will send out a `postCreated` event to the event bus as user creates a post or updates a post. Moderation and and voteBreakdown services have subscribed to the postCreated service in the event bus. Therefore, they will handle `postCreated` event when the event is sent.

This service needs to check whether if the given userId is a valid user before performing operations. It will send a `userDataRequest` to the user service via event bus and thread service will base on how user service's response. 


## Service Endpoints
POST `/posts/create`
Method: POST
URL: /posts/create
use: To create a new topic thread.
BODY:
Request Data Constraints:
{
    userId: "[unique identifier]"
    username: "[unicode 64 characters max]"
    title: "[unicode 64 characters max]",
    content: "[unicode 2000 characters max]",
    candidate: "[a string array]"
}
Request Data Example:
{
   userId: "123asd456"
   username: "Jack0106"
   title: "The Political And Economic State Of The World",
   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
   candidate: ["political", "economic"]
}
RESPONSE:
201 CREATED: If thread is successfully created.
Response Data Constraints:
{
    userId: “[unique identifier]”,
    postId: “[unique identifier]”,
    username: "[unicode 32 characters max]",
    title: "[unicode 64 characters max]",
    content: "[unicode 2000 characters max]"
    candidate: "[a string array]"
    date: "[current time Date type]"
}
Response Data Example:
{
   userId: "123asd456"
   postId: "ejoew8224f"
   username: "Jack0106"
   title: "The Political And Economic State Of The World",
   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
   candidate: ["political", "economic"]
   date: 2022-12-10
}
400 BAD REQUEST: If request data is incomplete
404: NOT FOUND: If userId is not found
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

GET `/posts/all`
Method: GET
URL: /posts/all
use: To return all posts
BODY:
Request Data Constraints:
{
}
Request Data Example:
{
}
RESPONSE:
200 OK: return all posts.
Response Data Constraints:
{
    [
        { 
            userId: “[unique identifier]”,
            postId: “[unique identifier]”,
            username: "[unicode 32 characters max]",
            title: "[unicode 64 characters max]",
            content: "[unicode 2000 characters max]"
            candidate: "[a string array]"
            date: "[current time Date type]"
        },
                { 
            userId: “[unique identifier]”,
            postId: “[unique identifier]”,
            username: "[unicode 32 characters max]",
            title: "[unicode 64 characters max]",
            content: "[unicode 2000 characters max]"
            candidate: "[a string array]"
            date: "[current time Date type]"
        },
        .
        .
        .
    ]
}
Response Data Example:
{
    [
        {
            userId: "123asd456"
            postId: "ejoew8224f"
            username: "Jack0106"
            title: "The Political And Economic State Of The World",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
            candidate: ["political", "economic"]
            date: 2022-12-10
        },
        { 
            userId: "123asd456"
            postId: "ejoew8224f"
            username: "Jack0106"
            title: "Economic State Of The World",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
            candidate: ["political", "economic"]
            date: 2022-12-12
        },
        .
        .
        .
    ]
}
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur


GET `/posts/get`
Method: GET
URL: /posts/get
use: To return the specific post
BODY:
Request Data Constraints:
{
    postId: “[unique identifier]”   
}
Request Data Example:
{
    postId: “jdkwefjwo2189”
}
RESPONSE:
200 OK: return the post.
Response Data Constraints:
{
    userId: “[unique identifier]”,
    postId: “[unique identifier]”,
    username: "[unicode 32 characters max]",
    title: "[unicode 64 characters max]",
    content: "[unicode 2000 characters max]"
    candidate: "[a string array]"
    date: "[current time Date type]"
}
Response Data Example:
{
    userId: "123asd456"
    postId: “jdkwefjwo2189”
    username: "Jack0106"
    title: "Economic State Of The World",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
    candidate: ["political", "economic"]
    date: 2022-12-12
}
400 BAD REQUEST: Request data is incomplete
404 NOT FOUND: Post not found
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

PUT `/posts/update`
Method: PUT
URL: /posts/update
use: To update the specific post
BODY:
Request Data Constraints:
{
    userId: “[unique identifier]”,
    postId: “[unique identifier]”,
    title: "[unicode 64 characters max]",
    content: "[unicode 2000 characters max]"
    candidate: "[a string array]"
}
Request Data Example:
{
    userId: "123asd456"
    postId: “jdkwefjwo2189”
    title: "Economic State Of The World",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
    candidate: ["political", "economic"]
}
RESPONSE:
201 CREATED: Sucessfully updated the post.
Response Data Constraints:
{
    userId: “[unique identifier]”,
    postId: “[unique identifier]”,
    username: "[unicode 32 characters max]",
    title: "[unicode 64 characters max]",
    content: "[unicode 2000 characters max]"
    candidate: "[a string array]"
    date: "[current time Date type]"
}
Response Data Example:
{
    userId: "123asd456"
    postId: “jdkwefjwo2189”
    username: "Jack0106"
    title: "Economic State Of The World",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tincidunt lorem. Nulla pellentesque diam sit amet nulla aliquam, et fermentum orci congue. Suspendisse risus quam, tristique ut sapien ac, elementum ultrices lorem. Proin tempus purus at eros pellentesque euismod. Mauris ultricies sed augue pellentesque aliquam. Nam venenatis nisi in sapien auctor sollicitudin. Aenean sagittis dignissim ante eu tristique.",
    candidate: ["political", "economic"]
    date: 2022-12-12
}
400 BAD REQUEST: Request data is incomplete
401 UNATHORIZED: user does not exist or user is not the creator of the threads
404 NOT FOUND: Post not found OR User not found
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

DELETE `/posts/delete`
Method: DELETE
URL: /posts/delete
use: To delete the topic thread specified.
BODY:
Request Data Constraints:
{ 	
    postId: "[unicode 64 characters max]",
    userId: "[unique identifier]"
}
Request Data Example:
{
    postId: "1a2s3d4f"
    userId: "123asd456"
}

RESPONSE:
200 OK: If post is found AND the given userid matches the postId's userId Response Data Constraints:
Response Data Constraints:
{
    userId: "[unique identifier]",
    postId: "[unique identifier]",
    message: "[unicode 256 characters max]"
}
Response Data Example:
{
    userId: "123asd456",
    postId: "1a2s3d4f",
    message: "postId 1a2s3d4f has been removed by userId 123asd456"
}

400 BAD REQUEST: If request data is incomplete
401 UNAUTHORIZED: user does not exist or user is not the creator of the thread.
404 NOT FOUND: If post does not exist OR user not found.
500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur

## How to run the service?
Have the port 4006 available.

Docker needs to be installed in order to run this service along with other services. Event bus will be the first one to run up.

For running this service individually, first make sure to do `npm install` in the current directory to install node_modules in needed to run the service. Then you can do `npm start` to start the service.