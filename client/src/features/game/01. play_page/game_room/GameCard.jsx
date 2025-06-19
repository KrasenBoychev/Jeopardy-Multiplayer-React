import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import InviteFriend from "./buttons/InviteFriendBtn";
import CancelGameInvitation from "./buttons/CancelGameInvitation";

export function GameCard({ player, rivalPlayer }) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className={`flex flex-col items-center align-center relative group/card border-white/[0.1] w-auto sm:w-[15rem] h-80 rounded-xl bg-no-repeat 
             ${
               rivalPlayer || !player
                 ? "bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500"
                 : "bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500"
             }
             ${player ? "p-4" : "py-2 px-4"} border`}
      >
        <CardItem
          translateZ="50"
          className="py-30 text-2xl font-bold text-white"
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
