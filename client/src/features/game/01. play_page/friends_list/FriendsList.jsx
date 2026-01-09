import { useSelector } from "react-redux";
import { useGetFriendsListQuery } from "./friendsApiSlice";
import AddFriendBtn from "./AddFriendBtn";
import React from "react";
import { selectPlayers } from "../../gameSlice";

function FriendsListInner() {
  const players = useSelector(selectPlayers);
  const {
    data: friendsList,
    isLoading,
    isSuccess,
    isError,
  } = useGetFriendsListQuery("getFriendsList", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <div className="flex-1 mx-auto flex justify-end items-end">
      <div className="flex flex-col w-[300px] h-[400px] justify-between gap-2 text-white rounded-md p-[10px] shadow-[0_0_40px] shadow-chart-2 bg-[#00000090] max-[1600px]:w-[250px] max-[1600px]:h-[350px] max-[1400px]:w-[200px] max-[1400px]:h-[300px]">
        <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-2 uppercase font-bold max-[1600px]:text-[16px] max-[1400px]:text-[14px]">
          Friends List
        </h3>
        {isLoading && (
          <p className="flex-1 text-center">Loading friends status...</p>
        )}
        {isSuccess && friendsList.length > 0 && (
          <ul className="custom-scroll-container flex flex-col flex-1 px-2 gap-1 overflow-y-auto text-[17px] max-[1600px]:text-[15px] max-[1400px]:text-[13px]">
            {friendsList.map((friend) => (
              <li
                key={friend}
                className="flex justify-between gap-2 items-center"
              >
                <span>{friend}</span>
                <PlayerStatus friend={friend} players={players} />
              </li>
            ))}
          </ul>
        )}
        {isSuccess && friendsList.length == 0 && (
          <p className="text-center text-[17px] max-[1600px]:text-[15px] max-[1400px]:text-[13px]">
            Invite friends and earn points!
          </p>
        )}
        {isError && (
          <p className="text-center text-[17px] max-[1600px]:text-[15px] max-[1400px]:text-[13px]">
            Can't load friends list!
          </p>
        )}
        <AddFriendBtn />
      </div>
    </div>
  );
}

function PlayerStatus({ friend, players }) {
  const findPlayer = players.find((player) => player[1].username === friend);
  return (
    <span
      className={`w-5 h-5 rounded-full ${
        findPlayer
          ? findPlayer[1].status === "Online"
            ? "bg-green-500"
            : "bg-chart-5"
          : "bg-destructive"
      } max-[1600px]:w-4 max-[1600px]:h-4 max-[1400px]:w-3 max-[1400px]:h-3`}
    />
  );
}

export default React.memo(FriendsListInner);
