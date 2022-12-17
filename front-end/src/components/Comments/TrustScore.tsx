import react, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { LegendToggle } from "@mui/icons-material";
import { VscWorkspaceTrusted, VscWorkspaceUntrusted } from "react-icons/vsc";

type Props = {
  userId: string;
};
// Gets the trust score of the user from the backend and sets the trust score
const TrustScore = ({ userId }: Props) => {
  //sets the trust score of the user
  const setTrustScore = (trustScore: number) => {
    setTrustScore(trustScore);
  };

  let [score, setScore] = useState(0);

  const getTrustScore = async () => {
    await axios
      .get(`http://localhost:4007/getTrust?userId=${userId}`)
      .then((responseScore: { data: react.SetStateAction<number> }) => {
        setScore(responseScore.data);
      });
  };

  // Runs the getTrustScore function when the component is mounted
  useEffect(() => {
    console.log("GETTING TruST SCORE");
    getTrustScore();
  }, []);

  const TrustIcon = () => {
    let icon = null;
    if (score > 5000) icon = <VscWorkspaceTrusted />;
    else icon = <VscWorkspaceUntrusted />;
    return (
      <div>
        {icon} {score}
      </div>
    );
  };

  // Renders the trust score of the user
  return (
    <Badge
      pill
      bg={score > 500 ? "success" : "danger"}
      style={{
        alignItems: "center",
        padding: "4px",
      }}
      className=" m-0 mt-2 mb-2"
    >
      <TrustIcon />
    </Badge>
  );
};

export default TrustScore;
