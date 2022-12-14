import react, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { LegendToggle } from "@mui/icons-material";

//sets the trust score of the user
const setTrustScore = (trustScore: number) => {
  setTrustScore(trustScore);
};
type Props = {
  userId: string;
};

// Gets the trust score of the user from the backend and sets the trust score
const TrustScore = ({ userId }: Props) => {
  let [score, setScore] = useState(0);

  const getTrustScore = async () => {
    score = await axios.get(
      `http://trustdistinction:4007/getTrustScore?userId=${userId}`
    );
    setScore(score);
  };

  // Runs the getTrustScore function when the component is mounted
  useEffect(() => {
    getTrustScore();
  }, []);

  // Renders the trust score of the user
  return (
    <div
      style={{
        alignItems: "center",
        padding: "5px",
        marginBottom: "5px",
        marginLeft: "3px",
      }}
    >
      <Badge bg="secondary" className=" m-0 mt-2 mb-2">
        {score}
      </Badge>
    </div>
  );
};

export default TrustScore;
