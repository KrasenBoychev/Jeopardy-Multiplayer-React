"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({ index, gameCategory, categoryCount, user, activePlayer, PopUp }) => (
    <div
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-40 md:h-40 w-full transition-all duration-300 ease-out",
        (index > categoryCount ||
          (index == categoryCount &&
            user.username !== activePlayer.username)) &&
          "blur-sm scale-[0.98]"
      )}
    >
      {/* <img src={card.src} alt={card.title} className="object-cover absolute inset-0" /> */}
      <div
        className={cn(
          "absolute inset-0 bg-white flex items-center justify-center py-8 px-4 transition-opacity duration-300 uppercase",
          index <= categoryCount ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "text-xl md:text-2xl font-medium bg-clip-text text-black bg-gradient-to-b from-neutral-50 to-neutral-200 uppercase",
            index == categoryCount &&
              user.username === activePlayer.username &&
              "cursor-pointer"
          )}
        >
          {index == categoryCount && user.username === activePlayer.username
            ? PopUp
            : gameCategory}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";
