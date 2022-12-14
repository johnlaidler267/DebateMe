Ethan Stafford - estaff2 
Other member
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