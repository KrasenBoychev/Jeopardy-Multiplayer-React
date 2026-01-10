import { ColourfulText } from "@/components/ui/colourful-text";
import { useGetCategoriesQuery } from "../gameApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { deletePlayersDetails, selectRoomId } from "../playersSlice";
import toast from "react-hot-toast";
import { deleteGameDetails } from "../gameSlice";

export function LoadingGame() {
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();
  const colors = ["rgba(37, 234, 30, 0.73)"];

  console.log(roomId);

  const {
    data: allCategories,
    isSuccess,
    isError,
  } = useGetCategoriesQuery("getCategories");

  useEffect(() => {
    // if (isSuccess) {
    //   dispatch(
    //     setSocketReq({
    //       socketReqName: "send_categories",
    //       socketData: {
    //         roomId,
    //         allCategories,
    //       },
    //     })
    //   );
    // }

    if (isError) {
      toast.error("Starting the game failed!");

      dispatch(
        setSocketReq({
          socketReqName: "leave_game",
          socketData: {
            roomId,
          },
        })
      );
      dispatch(deletePlayersDetails());
      dispatch(deleteGameDetails());
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex-1 flex flex-col uppercase items-center justify-center flex font-bold text-[50px] bg-[#00000095]">
      <div className="flex-1"></div>
      <div className="flex-1 flex items-center justify-center">
        <ColourfulText
          text="Loading Game..."
          colors={colors}
          className="tracking-widest"
        />
      </div>
    </div>
  );
}
