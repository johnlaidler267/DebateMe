import express from 'express';
import logger from 'morgan';
import axios from 'axios';

let commentCreated = [] //stores ports that want commentCreated event 
let moderated = [] //stores ports that want commentModerated event
let commentVotes  = [] //stores ports that want commentVote events 
let voteCreated = []  //stores ports 
 

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
    if(eventArray.includes("commentVotes")){
      commentVotes.push(port);
    }
    if(eventArray.includes("voteCreated")){
      voteCreated.push(port)
    }
  }

});

app.post('/events', async (req, res) => {
  const event = req.query;
  //make subscriptable here, need to check type of incoming event and send it only to services that care about that event. 
  let eventType = event.type; //make sure type is the name of the array
  if(eventType = commentCreated){
    for(let i = 0; i< commentCreated.length; i++){
      await axios.post(`http://localhost:${commentCreated[i]}/events`, event).catch((err) => {
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
