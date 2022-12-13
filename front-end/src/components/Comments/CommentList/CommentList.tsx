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
      `http://localhost:4001/comments/get?postId=${postId}`
    );
    setComments(result.data);
  };

  useEffect(() => {
    retrieveComments();
  }, []);

  const renderedComments = Object.values(comments).map((c) => {
    return (
      <div key={c.commentid}>
        <Container className="mt-4" style={{ width: "75%" }}>
          <Card className="pt-3 ps-2 pe-2 pb-3">
            <Card.Header>
              <Row>
                <Col>
                  <Card.Title> {c.username} </Card.Title>
                </Col>
                <Col>
                  <TrustScore userId={c.username} />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="ps-4 pe-4">
              <div id="upvote">
                <Upvote commentId={c.commentid} ownerId={c.userid} />
              </div>
              <p id="content">{c.content}</p>
              <div id="downvote">
                <Downvote commentId={c.commentid} ownerId={c.userid} />
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
