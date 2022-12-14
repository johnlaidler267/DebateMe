Ethan Stafford - estaff2 
Chou Hneg Ieong - ieongch0106
Other member

This is the front end service. There is a wide variety of components that are important here, so this file will be broken down by team member. 

Ethan Stafford Components: 
    The services I was responsbile for are in the src/components/comments folder. There are 4 compontents within this.

    There is the CommentList component. This is resposible for the displaying all the comments on an associated post. When a post is clicked on, a request is sent to the comment service to retrieve all comments attached to that postId. This list is sorted by the number of total upvotes and downvotes on comments. So whenever a new vote is added that would change the order, the display will automaticaly re-render to have comments in the correct order. 

    There is the CommentCreate component. This is responsible for the creation of new comments. There is a box for people to enter their comment, when they hit the submit button a request is sent to add that comment to the comment service database. If it is accepted then the page will automatically update to display the created comment. 

    There is the Upvote component. This is responsible for the display of the upvotes on each comment. When all the comments are first displayed, this will interact with the commentVoting service to retrieve the number of upvotes on that comment. When the upvote button is clicked, it will either automaticaly update the display to increment the count next to it by 1, or there will be no change if the user has already upvoted that comment.

    There is the Downvote component. This is responsible for the display of the downvotes on each comment. When all the comments are first displayed, this will interact with the commentVoting service to retrieve the number of downvotes on that comment. When the downvote button is clicked, it will either automaticaly update the display to increment the count next to it by 1, or there will be no change if the user has already downvoted that comment.  

    To run specically all my services, you will need to npm install in the front end folder. You then need to start the following services: event bus, comment, commentVoting, commentModeration, threads, users. If you would like to see trust scores you will also need to start the trustDistinction service, but this is not completly essential. Then you will need to run npm start in the front-end folder.

    I think that my front-end services exceeds expecattions for a couple reasons. First off I think that I have code that is overall easy to read and follow. I think my code demonstrates a solid understanding of react and I use a good variety of tools/capabilites of react. Additonally, my front end responds well to a variety of different http requests and always renders the screen correctly based on these responses.

Chou Heng Ieong's Components:
    The services I was responsbile for are in the src/components folder: Post, PostUpdate and Message, and in the serc/pages folder: debate (Posts), create-election (PostCreate), profile (userUpdated), signup (userRegister) and login (userLogin). 8 components in total.

    The Post component is resposible for displaying a post including its title, content and the creator of the post. After clicking a post from the debate page (Posts), it redirects to the post page along with its postId. By using useEffect to fetch the post information by sending a request to the post service calling posts/get&postId=${postId}. After it is fetched, it renders on the page for all users to say.

    The PostUpdated component is resposible for updating the post title, content or candidates only by the creator of the post. This component is hidden in the yellow toggle button in the post, and it is only visible to the creator of the post. By clicking edit it redirects to postUpdated component where user can update the post. Clicking submit will call /posts/update to the post service and update the post in the post database.

    The Message component is resposible for creating new message and displaying all messages between you and another user. Fetching all messages between two users by calling messages/all endpoint in the message service. And when a user creates a message and clicking submit will call messages/create endpoint and gets added into the message database. The created message will update the conversation simutaneously.

    The debate page (Posts) is a component that is resposible for fetching all the posts from the post database by sending a request to the post service calling posts/all. The returned list is randomized and rendered on the page.

    The create-election (PostCreate) is a component that is resposible for allowing users to create a debate in our application. User will enter the title, content and candidates of the debate. After submit, it will send a request to the post service calling by posts/create and add a new post to the database.

    The profile (userUpdated) is a component that is resposible for updating users information. User can change their account information and click submit, a request will send to users/update in the user service. Then it will make changes to user information in the user database.

    The signup (userRegister) is a component that is resposible for user registration. After user completes all validations and requirements in the form and click submit, a request will send to users/register in the user service. Then it will create a new user account in our user database.

    The login (userLogin) is a component that is resposible for user login. After user submits their username and password in the form and click submit, a request will send to users/login in the user service to validate the identify of the user. It will send a response to the client to indicate if they are successfully logged in or not.

    To run all my services, you will need to go to the front-end directory and run the command `npm install`. Event bus service needs to be running before start any of my services (users, threads, messages). By going to service -> event-bus. In the directory, do `npm install` and `npm start` will start the event bus service. Next, you can go back to the front-end directory and do `npm start`.

    I believe that my front-end services exceeds expectations and it is very time-consuming to produce. I think all my 8 components that I created present my capability of using tools and skills in react. I created reusable modal component which is a cutomized pop up, it is very effective in displaying server's response in client. My 8 components show that I am also capable of sending calls to retrieve data, get response from my services and apply them in the client-side.
