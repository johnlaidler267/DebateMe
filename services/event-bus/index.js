import express from 'express';
import logger from 'morgan';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

/* Initialize arrays to store ports that want to receive events */
let commentCreatedPorts = []
let commentCreatedNames = []
let commentModeratedPorts = []
let commentModeratedNames = []
let postModeratedPorts = []
let postModeratedNames = []
let commentVotedPorts = []
let commentVotedNames = []
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

/* Add routes to the array of ports that want to receive events */
app.post('/subscribe', (req, res) => {
  const { port, name, eventArray } = req.body;

  console.log("SUBSCRIBING PORT ", port, " TO EVENTS ", eventArray)

  for (let i = 0; i < eventArray.length; i++) {
    if (eventArray.includes("commentCreated")) {
      if (commentCreatedPorts.includes(port)) continue;
      commentCreatedPorts.push(port);
      commentCreatedNames.push(name.toLowerCase());
    }
    if (eventArray.includes("commentModerated")) {
      if (commentModeratedPorts.includes(port)) continue;
      commentModeratedPorts.push(port);
      commentModeratedNames.push(name.toLowerCase());
    }
    if (eventArray.includes("postModerated")) {
      if (postModeratedPorts.includes(port)) continue;
      postModeratedPorts.push(port);
      postModeratedNames.push(name.toLowerCase());
    }
    if (eventArray.includes("commentVoted")) {
      if (commentVotedPorts.includes(port)) continue;
      commentVotedPorts.push(port);
      commentVotedNames.push(name.toLowerCase())
    }
    if (eventArray.includes("voteCreated")) {
      if (voteCreatedPorts.includes(port)) continue;
      voteCreatedPorts.push(port)
      voteCreatedNames.push(name.toLowerCase())
    }
    if (eventArray.includes("postCreated")) {
      if (postCreatedPorts.includes(port)) continue;
      postCreatedPorts.push(port)
      postCreatedNames.push(name.toLowerCase())
    }
    if (eventArray.includes("postUpdated")) {
      if (postUpdatedPorts.includes(port)) continue;
      postUpdatedPorts.push(port)
      postUpdatedNames.push(name.toLowerCase())
    }
    if (eventArray.includes("postDeleted")) {
      if (postDeletedPorts.includes(port)) continue;
      postDeletedPorts.push(port)
      postDeletedNames.push(name.toLowerCase())
    }
    if (eventArray.includes("userDataRequest")) {
      if (userDataRequestPorts.includes(port)) continue;
      userDataRequestPorts.push(port);
      userDataRequestNames.push(name.toLowerCase());
    }
  }
  res.status(200).send("Subscribed successfully!")
});

/* Send events to all ports that want to receive them */
app.post('/events', async (req, res) => {
  console.log("RECIEVED A NEW EVENT")
  const event = req.body;
  const eventType = event.type;

  if (eventType === "commentCreated") {
    for (let i = 0; i < commentCreatedPorts.length; i++) {

      // console.log(`http://${commentCreatedNames[i]}:${commentCreatedPorts[i]}/events`)
      //await axios.post(`http:/${commentCreatedNames[i]}:${commentCreatedPorts[i]}/events`, event).catch((err) => {
      //   console.log(err.message)
      //  });
      await axios.post(`http://localhost:${commentCreatedPorts[i]}/events`, event)
    }
    //res.send(event);
  }
  else if (eventType === "commentModerated") {
    for (let i = 0; i < commentModeratedPorts.length; i++) {
      //await axios.post(`http://${commentModeratedNames[i]}:${commentModeratedPorts[i]}/events`, event).catch((err) => {
      // console.log(err.message)
      //});
      await axios.post(`http://localhost:${commentModeratedPorts[i]}/events`, event)
    }
    //res.send(event);
  }
  else if (eventType === "postModerated") {
    for (let i = 0; i < postModeratedPorts.length; i++) {
      await axios.post(`http://localhost:${postModeratedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    //res.send(event);
  }
  else if (eventType === "commentVoted") {
    for (let i = 0; i < commentVotedPorts.length; i++) {
      await axios.post(`http://${commentVotedNames[i]}:${commentVotedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "voteCreated") {
    console.log("PORTS SUBSCRIBED TO VOTECREATED: ", voteCreatedPorts)
    for (let i = 0; i < voteCreatedPorts.length; i++) {
      await axios.post(`http://localhost:${voteCreatedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "postCreated") {
    console.log(postCreatedPorts);
    for (let i = 0; i < postCreatedPorts.length; i++) {
      await axios.post(`http://localhost:${postCreatedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
      // await axios.post(`http://${postCreatedNames[i]}:${postCreatedPorts[i]}/events`, event).catch((err) => {
      //   console.log(err.message)
      // });
    }
    res.send(event);
  }
  else if (eventType === "postUpdated") {
    for (let i = 0; i < postUpdatedPorts.length; i++) {
      await axios.post(`http://localhost:${postUpdatedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "postDeleted") {
    for (let i = 0; i < postDeletedPorts.length; i++) {
      await axios.post(`http://${postDeletedNames[i]}:${postDeletedPorts[i]}/events`, event).catch((err) => {
        console.log(err.message)
      });
    }
    res.send(event);
  }
  else if (eventType === "userDataRequest") {
    console.log("EVENT!!")
    console.log(event);
    const response = await axios.post(`http://localhost:4008/events`, event).catch((err) => {
      console.log(err.message)
    });
    console.log(response.data);
    res.send(response.data);
  }

  //console.log(event.type);
});

/* Start the server */
app.listen(4010, () => {
  console.log('Listening on 4010');
});
