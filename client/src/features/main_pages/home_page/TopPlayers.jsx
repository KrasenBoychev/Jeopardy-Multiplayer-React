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
      <div className="flex h-[600px] w-[450px] shadow-[0_0_40px_rgba(0,148,136)] rounded-sm my-auto overflow-hidden max-[1800px]:h-[500px] max-[1800px]:w-[400px] max-[1600px]:h-[450px] max-[1600px]:w-[350px] max-[1400px]:h-[400px] max-[1400px]:w-[300px]">
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
            <h3 className="text-green-500 text-4xl max-w-xl p-2 text-center font-bold uppercase max-[1800px]:text-3xl max-[1600px]:text-2xl max-[1400px]:text-xl">
              {isLoading ? "Loading Leaderboard" : "Leaderboard"}
            </h3>
            {isSuccess && (
              <ul className="custom-scroll-container mx-auto w-full gap-4 px-2 pb-2 z-10 text-[20px] overflow-y-auto max-[1800px]:text-[18px] max-[1600px]:text-[16px] max-[1400px]:text-[14px]">
                {topPlayers.map((card, index) => (
                  <motion.div
                    layoutId={`card-${card.username}-${id}`}
                    key={`card-${card.username}-${id}`}
                    className="p-4 flex flex-col md:flex-row justify-between items-center mt-3 bg-neutral-50 rounded-xl max-[1600px]:p-3 max-[1400px]:p-2"
                  >
                    <div className="flex gap-4 flex-col md:flex-row items-center">
                      <motion.p
                        className={`${
                          index < 3 ? "font-bold" : "font-normal"
                        } ${
                          index == 0
                            ? "bg-chart-5"
                            : index == 1
                            ? "bg-chart-2"
                            : index == 2
                            ? "bg-chart-3"
                            : "bg-black"
                        } text-white rounded-full w-8 h-8 flex items-center justify-center max-[1800px]:w-7 max-[1800px]:h-7 max-[1400px]:w-6 max-[1400px]:h-6`}
                      >
                        {index + 1}
                      </motion.p>
                      <div className="">
                        <motion.h3
                          layoutId={`title-${card.username}-${id}`}
                          className={`${
                            index < 3 ? "font-bold" : "font-medium"
                          } text-neutral-800 dark:text-neutral-200 text-left`}
                        >
                          {card.username}
                        </motion.h3>
                      </div>
                    </div>
                    <motion.button
                      layoutId={`button-${card.gameDetails.points}-${id}`}
                      className="px-4 py-2 rounded-full font-bold bg-green-500 text-white max-[1600px]:px-3 max-[1600px]:py-1.5 max-[1400px]:py-1"
                    >
                      {card.gameDetails.points}
                    </motion.button>
                  </motion.div>
                ))}
              </ul>
            )}
            {isError && (
              <p className="flex-1 content-center text-center text-destructive uppercase">
                Failed loading the top players
              </p>
            )}
          </motion.div>
        </AuroraBackground>
      </div>
    </>
  );
}
