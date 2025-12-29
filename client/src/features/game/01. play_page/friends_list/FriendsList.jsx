import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFriends, setFriends } from "./friendsSlice";
import { selectGameReqSentBy } from "../../gameSlice";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { useGetFriendsDetailsMutation } from "./friendsApiSlice";
import AddFriendBtn from "./buttons/AddFriendBtn";
import GameReqBtns from "./buttons/GameReqBtns";

export default function FriendsList() {
  const user = useSelector(selectCurrentUser);
  const friends = useSelector(selectFriends);
  const gameReqSentBy = useSelector(selectGameReqSentBy);
  const [getFriendsDetails, { isLoading, isSuccess, isError }] =
    useGetFriendsDetailsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const getFriendsServerRes = await getFriendsDetails(
        user.gameDetails.friendsList
      );
      const friendsList = getFriendsServerRes.data;

      if (friendsList) {
        dispatch(setFriends(friendsList));
      }
    })();
  }, []);

  return (
    <div className="flex-1 m-auto flex justify-end">
      <div className="flex flex-col w-[300px] h-[400px] justify-between gap-2 text-white rounded-md p-[10px] shadow-[0_0_40px] shadow-chart-2 bg-[#00000090]">
        <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-2 uppercase font-bold">
          Friends List
        </h3>
        {isLoading && <p>Loading friends status...</p>}
        {isSuccess && friends.length > 0 && (
          <ul className="custom-scroll-container flex flex-col flex-1 px-2 gap-1 text-[17px]">
            {friends.map((friend) => {
              return (
                <li
                  key={friend.username}
                  className="flex justify-between gap-2"
                >
                  <span>{friend.username}</span>
                  {gameReqSentBy.includes(friend.username) ? (
                    <GameReqBtns friendUsername={friend.username} />
                  ) : (
                    <span
                      className={`w-5 h-5 rounded-full ${
                        friend.gameInProgress
                          ? "bg-chart-5"
                          : friend.online
                          ? "bg-green-500"
                          : "bg-destructive"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {isSuccess && friends.length == 0 && (
          <p className="text-center">Invite friends and earn points!</p>
        )}
        {isError && <p className="text-center">Can't load friends list!</p>}
        <AddFriendBtn />
      </div>
    </div>
  );
}
