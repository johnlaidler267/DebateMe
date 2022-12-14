import { useState } from "react";
import axios from "axios";
import "./comment.css";
import { Card, Container, Col, Row, ListGroup } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

type Props = {
  postId: string;
};
type Token = {
  username: string;
  userId: string;
};

const CommentCreate = ({ postId }: Props) => {
  const [Value, setValue] = useState("");

  const newComment = async () => {
    let jsonToken: string | null = sessionStorage.getItem("token");
    let username = "";
    let userId = "";
    if (jsonToken === null) {
      username = "Guest";
      userId = "Guest";
    } else {
      const token: Token = JSON.parse(jsonToken);
      username = token.username;
      userId = token.userId;
    }
    await axios.post(
      `http://localhost:4001/addComment?userId=${userId}&postId=${postId}&content=${Value}&parentId=${postId}1&username=${username}`
    ); //maye need to change/get rid of parentId
  };

  return (
    <div id="commentCreate">
      <br></br>
      <Container style={{ width: "80%" }}>
        <Card>
          <Card.Body>
            <form onSubmit={newComment}>
              <label id="create" style={{ width: "97%", height: "100%" }}>
                <textarea
                  placeholder="What are your thoughts?"
                  id="commentBox"
                  value={Value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                    padding: "12px 20px",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f8f8f8",
                    border: "3px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    resize: "none",
                  }}
                ></textarea>
              </label>
              <Card.Footer>
                <button
                  className="btn btn-secondary"
                  style={{
                    width: "30%",
                    justifyContent: "center",
                  }}
                >
                  Comment
                </button>
              </Card.Footer>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default CommentCreate;
