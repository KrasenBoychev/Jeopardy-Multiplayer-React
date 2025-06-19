import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectRivalPlayer } from "../../playersSlice";
import { GameCard } from "./GameCard";
import "../../game.css";

export default function GameRoom() {
  const user = useSelector(selectCurrentUser);
  const rivalPlayer = useSelector(selectRivalPlayer);

  return (
    <div className="game_room_wrapper">
      <GameCard player={user} />
      <p className="text-white">VS</p>
      <GameCard player={rivalPlayer} rivalPlayer={true} />
    </div>
  );
}
