import { ArrowUp } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  commentId: string;
  ownerId: string;
};

const Upvote = ({ commentId, ownerId }: Props) => {
  const [Votes, setVotes] = useState(0);
  const registerVote = async () => {
    const jsonToken = sessionStorage.getItem("token");
    if (jsonToken === null) {
      alert("Must be logged in to vote ");
    } else {
      const token = JSON.parse(jsonToken);
      let response = await axios.post(
        `http://localhost:4002/comments/vote?userId=${token.userId}&commentId=${commentId}&vote=up&ownerId=${ownerId}`
      );
      if (response.data !== "No Changes") {
        window.location.reload();
      }
    }
  };
  const retrieveVotes = async () => {
    const result = await axios.get(
      `http://localhost:4002/comments/getVotes?commentId=${commentId}`
    );
    if (result.data.length === 0) {
      setVotes(0);
    } else {
      setVotes(result.data[0].upvotes.length);
    }
  };
  useEffect(() => {
    retrieveVotes();
  }, []);

  return (
    <div>
      <Button onClick={registerVote}>
        {" "}
        <ArrowUp> </ArrowUp> {Votes}
      </Button>
    </div>
  );
};

export default Upvote;
