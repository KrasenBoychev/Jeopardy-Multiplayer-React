import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { ColourfulText } from "@/components/ui/colourful-text";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";

export default function PlayBtn() {
  const navigate = useNavigate();

  return (
    <div
      className="flex-1 cursor-pointer flex shadow-[0_0_10px_rgba(254,154,0)] hover:shadow-[0_0_20px_rgba(254,154,0)] rounded-lg uppercase m-auto h-[50vh] overflow-hidden"
      onClick={() => navigate("/play")}
    >
      <AuroraBackground className="flex-1">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex-1 flex flex-col gap-10"
        >
          <div className="flex-1 content-end self-center font-bold text-[100px] ">
            <ColourfulText text="Play" className="uppercase tracking-widest" />
          </div>
          <div className="flex-1 flex self-center">
            <Play width={60} height={60} color="#ffb900" />
            <Play width={60} height={60} color="#009488" />
            <Play width={60} height={60} color="#e7000b" />
          </div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
