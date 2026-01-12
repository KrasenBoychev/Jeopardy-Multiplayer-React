import { useSelector } from "react-redux";
import { selectFirstPlayer, selectSecondPlayer } from "../playersSlice";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ColourfulText } from "@/components/ui/colourful-text";

export default function ResultGame() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);

  return (
    <>
      <BackgroundLines className="flex items-center justify-center gap-20 w-full flex-col px-4">
        <div className="w-full flex items-center justify-center relative overflow-hidden">
          <h1 className="text-7xl font-bold text-center uppercase bg-[#00000099] p-3 rounded-md relative z-2 font-sans max-[1600px]:text-6xl max-[1400px]:text-5xl">
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
        <div className="flex flex-col gap-7 bg-[#00000099] p-7 rounded-md shadow-[inset_0_0_13px_orange]">
          <p className="text-[30px] uppercase text-chart-5 font-bold max-[1800px]:text-[28px] max-[1600px]:text-[26px] max-[1400px]:text-[24px]">
            Final Result
          </p>
          <p className="flex gap-10 text-[25px] max-[1800px]:text-[23px] max-[1600px]:text-[21px] max-[1400px]:text-[19px]">
            <span className="flex gap-2 bg-chart-5 p-2 rounded-sm">
              <span>{firstPlayer.username}</span>
              <span>-</span>
              <span className="text-black">
                {firstPlayer.earnedPoints} points
              </span>
            </span>
            <span className="flex gap-2 bg-chart-5 p-2 rounded-sm">
              <span>{secondPlayer.username}</span>
              <span>-</span>
              <span className="text-black">
                {secondPlayer.earnedPoints} points
              </span>
            </span>
          </p>
        </div>
      </BackgroundLines>
    </>
  );
}
