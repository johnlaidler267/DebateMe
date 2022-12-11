import express from 'express';
import logger from 'morgan';
import axios from 'axios';
import cors from 'cors';

let commentCreatedPorts = [] //stores ports that want commentCreated event 
let commentCreatedNames = []
let commentModeratedPorts = [] //stores ports that want commentModerated event
let commentModeratedNames = []
let postModeratedPorts = []
let postModeratedNames =[]
let commentVotedPorts  = [] //stores ports that want commentVote events 
let commentVotedNames  = []
let voteCreatedPorts = [] 
let voteCreatedNames = [] 
let postCreatedPorts = [] 
let postCreatedNames = [] 
let postUpdatedPorts = []
let postUpdatedNames = []
let postDeletedPorts = []
let postDeletedNames = []
let userDataRequestPorts = []
let userDataRequestNames = []


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.post('/subscribe', (req, res) => {
  const options = req.body;
  let port = options.port
  let name = options.name
  let eventArray = options.events
  for(let i = 0; i < eventArray.length; i ++){
    if(eventArray.includes("commentCreated")){
      commentCreatedPorts.push(port);
      commentCreatedNames.push(name);
    }
    if(eventArray.includes("commentModerated")){
      commentModeratedPorts.push(port);
      commentModeratedNames.push(name);
    }
    if(eventArray.includes("postModerated")){
      postModeratedPorts.push(port);
      postModeratedNames.push(name);
    }
    if(eventArray.includes("commentVoted")){
      commentVotedPorts.push(port);
      commentVotedNames.push(name)
    }
    if(eventArray.includes("voteCreated")){
      voteCreatedPorts.push(port)
      voteCreatedNames.push(name)
    }
    if(eventArray.includes("postCreated")){
      postCreatedPorts.push(port)
      postCreatedNames.push(name)
    }
    if(eventArray.includes("postUpdated")){
      postUpdatedPorts.push(port)
      postUpdatedNames.push(name)
    }
    if(eventArray.includes("postDeleted")){
      postDeletedPorts.push(port)
      postDeletedNames.push(name)
    }
    if(eventArray.includes("userDataRequest")){
      userDataRequestPorts.push(port);
      userDataRequestNames.push(name);
    }
  }
  res.status(200).send("Subscribed successfully")
});

app.post('/events', async (req, res) => {
  const event = req.body;
  let eventType = event.type; 
  if(eventType === "commentCreated"){
    for(let i = 0; i < commentCreatedPorts.length; i++){
      console.log('creation ');
      
     // console.log(`http://${commentCreatedNames[i]}:${commentCreatedPorts[i]}/events`)
      //await axios.post(`http:/${commentCreatedNames[i]}:${commentCreatedPorts[i]}/events`, event).catch((err) => {
     //   console.log(err.message)
    //  });
     await axios.post(`http://localhost:${commentCreatedPorts[i]}/events`, event)
    }
    //res.send(event);
  }
  else if (eventType === "commentModerated"){
    for(let i = 0; i< commentModeratedPorts.length; i++){
      console.log('moderation')
      //await axios.post(`http://${commentModeratedNames[i]}:${commentModeratedPorts[i]}/events`, event).catch((err) => {
       // console.log(err.message)
      //});
      await axios.post(`http://localhost:${commentModeratedPorts[i]}/events`, event)
    }
    //res.send(event);
 }
 else if (eventType === "postModerated"){
  for(let i = 0; i< postModeratedPorts.length; i++){
    await axios.post(`http://${postModeratedNames[i]}:${postModeratedPorts[i]}/events`, event).catch((err) => {
      console.log(err.message)
    });
  }
  //res.send(event);
}
  else if (eventType === "commentVoted"){
    for(let i = 0; i< commentVotedPorts.length; i++){
      await axios.post(`http://${commentVotedNames[i]}:${commentVotedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "voteCreated"){
    for(let i = 0; i< voteCreatedPorts.length; i++){
      await axios.post(`http://${voteCreatedNames[i]}:${voteCreatedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "postCreated"){
    console.log(postCreatedPorts);
    for(let i = 0; i< postCreatedPorts.length; i++){
      await axios.post(`http://localhost:${postCreatedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
      // await axios.post(`http://${postCreatedNames[i]}:${postCreatedPorts[i]}/events`, event).catch((err) => {
      //   console.log(err.message)
      // });
    }
    res.send(event);
  }
  else if (eventType === "postUpdated"){
    for(let i = 0; i< postUpdatedPorts.length; i++){
      await axios.post(`http://localhost:${postUpdatedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "postDeleted"){
    for(let i = 0; i< postDeletedPorts.length; i++){
      await axios.post(`http://${postDeletedNames[i]}:${postDeletedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "userDataRequest"){
      console.log(event);
      const response = await axios.post(`http://localhost:4008/events`, event).catch((err) => {
        console.log(err.message)
      });
      console.log(response.data);
      res.send(response.data);
  }

  //console.log(event.type);
});

app.listen(4010, () => {
  console.log('Listening on 4010');
});
