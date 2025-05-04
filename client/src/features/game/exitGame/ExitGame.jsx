import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFriendsDetailsMutation } from "../01. play_page/children/friendsList/friendsApiSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { useChangeGameInProgressMutation } from "../gameApiSlice";
import exitGameFunc from "./exitGameFunc";
import Confrim from "./confirm/Confrim";
import "./exit.css";

export default function ExitGame() {
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [isGameLeft, setIsGameLeft] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [getFriendsDetails] = useGetFriendsDetailsMutation();
  const [changeGameInProgress] = useChangeGameInProgressMutation();

  useEffect(() => {
    if (isGameLeft) {
      (async () => {
        exitGameFunc(user, dispatch, getFriendsDetails, changeGameInProgress);
      })();
    }
  }, [isGameLeft]);

  const leaveGameClickHandler = () => {
    setShowConfirmMessage(true);
  };

  return (
    <>
      <div className="exit-game-container">
        <p onClick={leaveGameClickHandler}>Exit Game</p>
      </div>

      {showConfirmMessage && (
        <Confrim
          props={{
            setShowConfirmMessage,
            setIsGameLeft,
          }}
        />
      )}
    </>
  );
}
