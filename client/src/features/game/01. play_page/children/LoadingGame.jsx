"use client";
import { Button } from "@/components/ui/moving-border";

export function LoadingGame() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white text-xl uppercase dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Loading Game
      </Button>
    </div>
  );
}
