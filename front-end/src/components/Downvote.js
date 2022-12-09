import {ArrowDown} from 'react-bootstrap-icons';
import {Button} from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';

const Downvote= ({ commentId, ownerId}) => {
    const [Votes, setVotes] = useState(0)
    const registerVote = async () =>{
        const token = JSON.parse(sessionStorage.getItem('token'));
        if(token === null){
            alert("Must be logged in to vote ");
        }
        else{
            await axios.post(`http://localhost:4002/comments/vote?userId=${token.userid}&commentId=${commentId}&vote=down&ownerId=${ownerId}`)
            setVotes(Votes + 1 ) //is this neccessary?
        }
    }
    const retrieveVotes= async () => {
        const result = await axios.get(`http://localhost:4002/comments/getVotes?commentId=${commentId}`)
        if (result.data.length === 0){
            setVotes(0)
        }
        else{
            
            setVotes(result.data[0].downvotes.length)
        }
   
    }
    useEffect(() => {
        retrieveVotes();
      }, []);

    return (
        <div>
          <Button onClick={registerVote}> <ArrowDown> </ArrowDown> {Votes}</Button>
        </div>
      )
}

export default Downvote