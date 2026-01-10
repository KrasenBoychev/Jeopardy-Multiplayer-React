import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import SelectFriend from "./actions/SelectFriend";
import { selectActiveFriends } from "../../gameSlice";
import { useGetFriendsListQuery } from "../friends_list/friendsApiSlice";

export default function PickOpponent() {
  const [searchInput, setSearchInput] = useState("");
  const activeFriends = useSelector(selectActiveFriends);
  const { data: friendsList, isSuccess } =
    useGetFriendsListQuery("getFriendsList");

  const onlineFriends = useMemo(() => {
    if (!isSuccess) return [];
    return activeFriends.filter((friend) =>
      friendsList.find(
        (friendName) =>
          friend[1].username == friendName && friend[1].status === "Online"
      )
    );
  }, [activeFriends, friendsList]);

  const filteredFriends = useMemo(() => {
    if (!searchInput) return onlineFriends;
    return onlineFriends.filter((friend) =>
      friend[1].username.startsWith(searchInput)
    );
  }, [searchInput, onlineFriends]);
  return (
    <>
      <h3 className="pb-2 text-[18px] text-center border-b-[1px] border-b-chart-5 uppercase font-bold max-[1600px]:text-[16px] max-[1400px]:text-[14px]">
        Pick your opponent
      </h3>
      {onlineFriends.length > 0 ? (
        <ul className="custom-scroll-container flex flex-col flex-1 px-2 gap-1 text-[17px] max-[1600px]:text-[15px] max-[1400px]:text-[13px]">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <SelectFriend friend={friend} key={friend[1].username} />
            ))
          ) : (
            <p className="flex-1 self-center content-center text-[17px] max-[1600px]:text-[15px] max-[1400px]:text-[13px]">
              No friends found
            </p>
          )}
        </ul>
      ) : (
        <p className="flex-1 self-center content-center text-[17px] max-[1600px]:text-[15px] max-[1400px]:text-[13px]">
          No online or available friends
        </p>
      )}

      <div className="gap-2 pt-2.5 border-t-[1px] border-t-chart-5 max-[1600px]:pt-2 max-[1400px]:pt-1">
        <input
          className="w-full px-1 text-[15px] max-[1600px]:text-[13px] max-[1400px]:text-[11px]"
          type="text"
          placeholder="Search opponent..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
    </>
  );
}
