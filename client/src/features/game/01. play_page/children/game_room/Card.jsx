import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import InviteFriend from "./buttons/InviteFriendBtn";
import CancelGameInvitation from "./buttons/CancelGameInvitation";

export function ThreeDCardDemo({ player, rivalPlayer }) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className={`flex flex-col items-center align-center bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white/[0.1] w-auto sm:w-[15rem] h-80 rounded-xl ${
          player ? "p-4" : "py-2 px-4"
        } border`}
      >
        <CardItem
          translateZ="50"
          className="py-30 text-xl font-bold text-neutral-600 dark:text-white"
        >
          {player ? player.username : <InviteFriend />}
        </CardItem>
        {rivalPlayer && player?.username && (
          <CardItem className="absolute bottom-2">
            <CancelGameInvitation />
          </CardItem>
        )}
      </CardBody>
    </CardContainer>
  );
}
