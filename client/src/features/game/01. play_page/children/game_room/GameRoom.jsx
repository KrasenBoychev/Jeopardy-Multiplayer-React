import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../authentication/authSlice";
import { selectRivalPlayer } from "../../../playersSlice";
import { ThreeDCardDemo } from "./Card";
import "./gameRoom.css";

export default function GameRoom() {
  const user = useSelector(selectCurrentUser);
  const rivalPlayer = useSelector(selectRivalPlayer);

  return (
    <div className="game_room_wrapper">
      <ThreeDCardDemo player={user} />
      <p className="text-white">VS</p>
      <ThreeDCardDemo player={rivalPlayer} rivalPlayer={true} />
    </div>
  );
}
