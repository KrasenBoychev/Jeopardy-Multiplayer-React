import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { selectFirstPlayer } from "../playersSlice";
import Categories from "../03. categories/Categories";
import "../game.css";

export default function StartingPlayer() {
  const firstPlayer = useSelector(selectFirstPlayer);
  const [renderCategories, setRenderCategories] = useState(false);

  setTimeout(() => {
    setRenderCategories(true);
  }, 4000);

  return renderCategories ? (
    <Categories />
  ) : (
    <>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 2,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl uppercase"
        >
          {firstPlayer.username}
        </motion.h1>
      </LampContainer>
    </>
  );
}
