import axios from "axios";
import { useEffect, Dispatch, SetStateAction } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Upvote from "../Upvote/Upvote";
import Downvote from "../Downvote/Downvote";
import "./commentList.css";
import TrustScore from "../TrustScore";

interface Comment {
  userid: string;
  parentId: string;
  commentid: string;
  postId: string;
  content: string;
  username: string;
  //parentType? Is this neccessary?
}

type Props = {
  postId: string;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

const CommentList = ({ postId, comments, setComments }: Props) => {
  const retrieveComments = async () => {
    const result = await axios.get(
      `http://comments:4001/comments/get?postId=${postId}`
    );
    setComments(result.data);
  };

  useEffect(() => {
    retrieveComments();
  }, []);

  const renderedComments = Object.values(comments).map((c) => {
    return (
      <div key={c.commentid}>
        <Container className="mt-4" style={{ width: "65%" }}>
          <Card className="pt-3 ps-2 pe-2 pb-3">
            <Card.Header>
              <Card.Title style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>{c.username}</div>
                <TrustScore userId={c.username} />
              </Card.Title>
            </Card.Header>
            <Card.Body className="ps-4 pe-4">
              <p id="content">{c.content}</p>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <div id="upvote" style={{ padding: "2px" }}>
                  <Upvote commentId={c.commentid} ownerId={c.userid} />
                </div>
                <div id="downvote" style={{ padding: "2px" }}>
                  <Downvote commentId={c.commentid} ownerId={c.userid} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  });
  return <div>{renderedComments}</div>;
};

export default CommentList;
