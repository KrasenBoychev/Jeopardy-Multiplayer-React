"use client";
import { cn } from "@/lib/utils";
import InfiniteMarquee from "../../../components/InfiniteMarquee";

export default function Card({
  index,
  gameCategory,
  categoryCount,
  user,
  activePlayer,
  PopUp,
}) {
  return (
    <div
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-35 w-full transition-all duration-300 ease-out max-[1600px]:h-35 max-[1400px]:h-30",
        (index > categoryCount ||
          (index == categoryCount &&
            user.username !== activePlayer.username)) &&
          "blur-sm scale-[0.98]",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-300 uppercase",
          index <= categoryCount ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          className={cn(
            "text-xl font-medium bg-clip-text max-w-full text-black bg-gradient-to-b from-neutral-50 to-neutral-200 uppercase",
            index == categoryCount &&
              user.username === activePlayer.username &&
              "cursor-pointer",
          )}
        >
          {index == categoryCount && user.username === activePlayer.username ? (
            PopUp
          ) : (
            <InfiniteMarquee>
              <p className="p-2">{gameCategory.name}</p>
            </InfiniteMarquee>
          )}
        </div>
      </div>
    </div>
  );
}
