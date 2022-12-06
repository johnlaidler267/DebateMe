import express from 'express';
import logger from 'morgan';
import axios from 'axios';

let commentCreated = [] //stores ports that want commentCreated event 
let moderated = [] //stores ports that want commentModerated event
let commentVoted  = [] //stores ports that want commentVote events 
let voteCreated = []  //stores ports 
let postCreated = [] 
let postUpdated = []
let postDeleted = []
let userDataRequest = []

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.post('/subscribe', (req, res) => {
  const options = req.query;
  let port = options.port
  let eventArray = options.events
  for(let i = 0; i < eventArray.length; i ++){
    if(eventArray.includes("commentCreated")){
      commentCreated.push(port);
    }
    if(eventArray.includes("moderated")){
      moderated.push(port);
    }
    if(eventArray.includes("commentVoted")){
      commentVoted.push(port);
    }
    if(eventArray.includes("voteCreated")){
      voteCreated.push(port)
    }
    if(eventArray.includes("postCreated")){
      postCreated.push(port)
    }
    if(eventArray.includes("postUpdated")){
      postUpdated.push(port)
    }
    if(eventArray.includes("postDeleted")){
      postDeleted.push(port)
    }
    if(eventArray.includes("userDataRequest")){
      userDataRequest.push(port)
    }
  }
  res.status(200).send("Subscribed to events")
});

app.post('/events', async (req, res) => {
  const event = req.query;
  //make subscriptable here, need to check type of incoming event and send it only to services that care about that event. 
  let eventType = event.type; //make sure type is the name of the array
  if(eventType = "commenntCreated"){
    for(let i = 0; i< commentCreated.length; i++){
      await axios.post(`http://localhost:'${commentCreated[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }
  else if (eventType = "moderated"){
    for(let i = 0; i< moderated.length; i++){
      await axios.post(`http://localhost:'${moderated[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
  }
 }
  else if (eventType = "commentVoted"){
    for(let i = 0; i< commentVoted.length; i++){
      await axios.post(`http://localhost:'${commentVoted[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }
  else if (eventType = "voteCreated"){
    for(let i = 0; i< voteCreated.length; i++){
      await axios.post(`http://localhost:'${voteCreated[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }
  else if (eventType = "postCreated"){
    for(let i = 0; i< postCreated.length; i++){
      await axios.post(`http://localhost:'${postCreated[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }
  else if (eventType = "postUpdated"){
    for(let i = 0; i< postUpdated.length; i++){
      await axios.post(`http://localhost:'${postUpdated[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }
  else if (eventType = "postDeleted"){
    for(let i = 0; i< postDeleted.length; i++){
      await axios.post(`http://localhost:'${postDeleted[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }
  else if (eventType = "userDataRequest"){
    for(let i = 0; i< userDataRequest.length; i++){
      await axios.post(`http://localhost:'${userDataRequest[i]}'/events`, events).catch((err) => {
        console.log(err.message)
      });
    }
  }

  console.log(event.type);
  res.send();
});

app.listen(4010, () => {
  console.log('Listening on 4010');
});
