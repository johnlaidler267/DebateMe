import { useState } from "react";
import axios from "axios";
import "./comment.css";

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
      <form onSubmit={newComment}>
        <label id="create">
          Enter your comment here:
          <input
            id="commentBox"
            type="text"
            value={Value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </label>
        <button className="custom-btn">Submit Comment</button>
      </form>
    </div>
  );
};
export default CommentCreate;
