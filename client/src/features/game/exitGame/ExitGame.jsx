import { useState } from "react";
import Confrim from "./Confrim";

export default function ExitGame() {
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const leaveGameClickHandler = () => {
    setShowConfirmMessage(true);
  };

  return (
    <>
      <div className="absolute top-0 right-0 flex">
        <p
          className="m-3 p-2 text-[15px] text-black bg-white rounded-md shadow-[inset_0_0_10px_red] z-9999 cursor-pointer hover:font-bold max-[1600px]:text-[13px] max-[1400px]:text-[11px]"
          onClick={leaveGameClickHandler}
        >
          Leave Game
        </p>
      </div>

      {showConfirmMessage && (
        <Confrim setShowConfirmMessage={setShowConfirmMessage} />
      )}
    </>
  );
}
