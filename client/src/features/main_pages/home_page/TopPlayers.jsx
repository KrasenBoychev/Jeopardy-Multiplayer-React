import { useId } from "react";
import { motion } from "motion/react";
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
        <>
          <h3 className="text-green-500 text-sm md:text-3xl max-w-xl mt-11 text-center font-bold uppercase">
            {isLoading ? "Loading Leaderboard" : "Leaderboard"}
          </h3>
          {isSuccess && (
            <ul className="max-w-2xl mx-auto w-full gap-4">
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
        </>
      )}
    </>
  );
}
