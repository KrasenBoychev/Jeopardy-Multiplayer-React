import { useSelector } from "react-redux";
import { selectFirstPlayer, selectSecondPlayer } from "../playersSlice";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ColourfulText } from "@/components/ui/colourful-text";
import "./resultGame.css";

export default function ResultGame() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);

  return (
    <>
      <BackgroundLines className="flex items-center justify-center gap-20 w-full flex-col px-4">
        <div className="w-full flex items-center justify-center relative overflow-hidden">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white uppercase relative z-2 font-sans">
            <ColourfulText
              text={
                firstPlayer.earnedPoints == secondPlayer.earnedPoints
                  ? `points shared`
                  : firstPlayer.earnedPoints > secondPlayer.earnedPoints
                  ? `${firstPlayer.username} is the winner`
                  : `${secondPlayer.username} is the winner`
              }
            />
          </h1>
        </div>
        <div className="final_result">
          <p>Final Result</p>
          <p className="final_players">
            <span className="final_first_player">
              <span>{firstPlayer.username}:</span>
              <span>{firstPlayer.earnedPoints} points</span>
            </span>
            <span className="final_vs">VS</span>
            <span className="final_second_player">
              <span>{secondPlayer.username}:</span>
              <span>{secondPlayer.earnedPoints} points</span>
            </span>
          </p>
        </div>
      </BackgroundLines>
    </>
  );
}
