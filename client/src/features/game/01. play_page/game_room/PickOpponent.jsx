import { useSelector } from "react-redux";
import { selectFriends } from "../friends_list/friendsSlice";
import { useState, useMemo } from "react";
import SelectFriend from "./actions/SelectFriend";

export default function PickOpponent() {
  const friends = useSelector(selectFriends);
  const [searchInput, setSearchInput] = useState("");

  const onlineFriends = useMemo(() => {
    if (!friends) return [];
    return friends.filter(
      (friend) => friend.online === true && !friend.gameInProgress
    );
  }, [friends]);

  const filteredFriends = useMemo(() => {
    if (!searchInput) return onlineFriends;
    return onlineFriends.filter((friend) =>
      friend.username.startsWith(searchInput)
    );
  }, [searchInput, onlineFriends]);
  return (
    <>
      <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-5 uppercase font-bold">
        Pick your opponent
      </h3>
      {onlineFriends.length > 0 ? (
        <ul className="custom-scroll-container flex flex-col flex-1 px-2 gap-1 text-[17px]">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <SelectFriend friend={friend} key={friend.username} />
            ))
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
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
    </>
  );
}
