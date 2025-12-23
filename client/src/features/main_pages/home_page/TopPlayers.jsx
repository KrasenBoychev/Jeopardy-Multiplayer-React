import { useId } from "react";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useGetTopPlayersQuery } from "./homePageApiSlice";

export function TopPlayers() {
  const id = useId();
  const {
    data: topPlayers,
    isLoading,
    isSuccess,
    isError,
  } = useGetTopPlayersQuery("getTopPlayers", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      {!isError && (
        <div className="h-[70vh] flex w-[450px] shadow-[0_0_40px_rgba(0,148,136)] rounded-sm my-auto overflow-hidden">
          <AuroraBackground className="flex-1 flex-col p-2">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="flex-1 flex flex-col w-full h-full"
            >
              <h3 className="text-green-500 text-sm md:text-3xl max-w-xl p-2 text-center font-bold uppercase">
                {isLoading ? "Loading Leaderboard" : "Leaderboard"}
              </h3>
              {isSuccess && (
                <ul className="custom-scroll-container mx-auto w-full gap-4 px-2 pb-2 z-10">
                  {topPlayers.map((card, index) => (
                    <motion.div
                      layoutId={`card-${card.username}-${id}`}
                      key={`card-${card.username}-${id}`}
                      className="p-4 flex flex-col md:flex-row justify-between items-center mt-3 bg-neutral-50 rounded-xl"
                    >
                      <div className="flex gap-4 flex-col md:flex-row ">
                        <motion.p>{index + 1}.</motion.p>
                        <div className="">
                          <motion.h3
                            layoutId={`title-${card.username}-${id}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                          >
                            {card.username}
                          </motion.h3>
                        </div>
                      </div>
                      <motion.button
                        layoutId={`button-${card.gameDetails.points}-${id}`}
                        className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white"
                      >
                        {card.gameDetails.points}
                      </motion.button>
                    </motion.div>
                  ))}
                </ul>
              )}
            </motion.div>
          </AuroraBackground>
        </div>
      )}
    </>
  );
}
