import { useSelector } from "react-redux";
import { selectFirstPlayer, selectSecondPlayer } from "../playersSlice";

export default function Score() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const secondPlayer = useSelector(selectSecondPlayer);

  return (
    <section>
      <div className="absolute top-5 left-5 w-fit h-fit flex flex-col items-center gap-4 p-5 text-[15px] border border-solid border-white rounded-md shadow-[inset_0_0_13px_orange] max-[1800px]:text-[14px] max-[1600px]:text-[13px] max-[1400px]:text-[12px]">
        <h3 className="font-bold uppercase text-chart-5">Score</h3>
        <div className="flex flex-col gap-3">
          <p className="flex gap-4 justify-between bg-chart-5 p-2 rounded-sm">
            <span>{firstPlayer.username}</span>
            <span className="text-black">
              {firstPlayer.earnedPoints} points
            </span>
          </p>
          <p className="flex gap-4 justify-between bg-chart-5 p-2 rounded-sm">
            <span>{secondPlayer.username}</span>
            <span className="text-black">
              {secondPlayer.earnedPoints} points
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
