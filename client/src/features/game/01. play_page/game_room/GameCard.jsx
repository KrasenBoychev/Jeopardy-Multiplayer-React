import React from "react";
import PickOpponent from "./PickOpponent";
import SelectedOpponent from "./SelectedOpponent";
import { useSelector } from "react-redux";
import { selectRivalPlayer } from "../../playersSlice";

function GameCardInner() {
  const rivalPlayer = useSelector(selectRivalPlayer);

  return (
    <div className="flex-1 mx-auto flex justify-start items-end">
      <div className="flex flex-col w-[300px] h-[400px] justify-between gap-2 text-white rounded-md p-[10px] shadow-[0_0_40px] shadow-chart-5 bg-[#00000090] max-[1600px]:w-[250px] max-[1600px]:h-[350px] max-[1400px]:w-[200px] max-[1400px]:h-[300px]">
        {!rivalPlayer ? <PickOpponent /> : <SelectedOpponent />}
      </div>
    </div>
  );
}

const GameCard = React.memo(GameCardInner);
export { GameCard };
