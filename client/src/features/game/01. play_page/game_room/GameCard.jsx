import React from "react";
import PickOpponent from "./PickOpponent";
import CancelGameInvitation from "./actions/CancelGameInvitation";
import { useSelector } from "react-redux";
import { selectRivalPlayer } from "../../playersSlice";

function GameCardInner() {
  const rivalPlayer = useSelector(selectRivalPlayer);

  return (
    <div className="flex-1 m-auto flex justify-start">
      <div className="flex flex-col w-[300px] h-[400px] justify-between gap-2 text-white rounded-md p-[10px] shadow-[0_0_40px] shadow-chart-5 bg-[#00000090]">
        {!rivalPlayer ? <PickOpponent /> : <CancelGameInvitation />}
      </div>
    </div>
  );
}

const GameCard = React.memo(GameCardInner);
export { GameCard };
