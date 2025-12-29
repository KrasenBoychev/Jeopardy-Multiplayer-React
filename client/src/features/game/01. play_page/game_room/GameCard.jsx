import InviteFriend from "./buttons/InviteFriendBtn";
import CancelGameInvitation from "./buttons/CancelGameInvitation";
import { useSelector } from "react-redux";
import { selectFriends } from "../friends_list/friendsSlice";
import { useEffect, useState } from "react";

export function GameCard({ player, rivalPlayer }) {
  const friends = useSelector(selectFriends);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    const filterOnlineFriends = friends.filter(
      (friend) => friend.online == true
    );

    setOnlineFriends(filterOnlineFriends);
  }, [friends]);

  useEffect(() => {
    if (searchInput == "") {
      setFilteredFriends(onlineFriends);
    } else {
      setFilteredFriends(
        onlineFriends.filter((friend) =>
          friend.username.startsWith(searchInput)
        )
      );
    }
  }, [searchInput, onlineFriends]);

  // useEffect(() => {
  //   if (searchInput !== null) {
  //     if (searchInput.length > 0) {
  //       const matchingUsernames = onlineFriends.filter((friend) =>
  //         friend.username.startsWith(searchInput)
  //       );
  //       setOnlineFriends(matchingUsernames);
  //     } else {
  //       setOnlineFriends(filterOnlineFriends);
  //     }
  //   }
  // }, [searchInput]);

  return (
    <div className="flex-1 m-auto flex justify-start">
      <div
        className={`flex flex-col w-[300px] h-[400px] justify-between gap-2 text-white rounded-md p-[10px] shadow-[0_0_40px] shadow-chart-5 bg-[#00000090] 
             ${rivalPlayer || !player ? "" : ""}
             ${player ? "" : ""}`}
      >
        <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-5 uppercase font-bold">
          Pick your opponent
        </h3>
        {onlineFriends.length > 0 ? (
          <ul className="custom-scroll-container flex flex-col flex-1 px-2 gap-1 text-[17px]">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => {
                return (
                  <li
                    key={friend.username}
                    className="flex justify-between gap-2 cursor-pointer rounded-sm hover:bg-white hover:text-black"
                  >
                    <span className="flex-1 text-center">
                      {friend.username}
                    </span>
                  </li>
                );
              })
            ) : (
              <p className="flex-1 self-center content-center">
                No friends found
              </p>
            )}
          </ul>
        ) : (
          <p className="flex-1 self-center content-center">No online friends</p>
        )}

        <div className="gap-2 pt-2.5 border-t-[1px] border-t-chart-5">
          <input
            className="w-full px-1"
            type="text"
            placeholder="Search opponent..."
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
        </div>

        {/* <div className="py-30 text-2xl font-bold text-white">
          {player ? player.username : <InviteFriend />}
        </div>
        {rivalPlayer && player?.username && (
          <div className="absolute bottom-2">
            <CancelGameInvitation />
          </div>
        )} */}
      </div>
    </div>
  );
}
