import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { ColourfulText } from "@/components/ui/colourful-text";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";

export default function PlayBtn() {
  const navigate = useNavigate();
  const colors = ["rgba(255, 255, 255, 1)", "rgba(255, 185, 0, 1)"];
  return (
    <div
      className="flex-1 cursor-pointer flex shadow-[0_0_15px_rgba(254,154,0)] hover:shadow-[0_0_30px_rgba(254,154,0)] rounded-lg uppercase m-auto h-[40vh] overflow-hidden"
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
          className="flex-1 flex content-center self-center font-bold text-[100px]"
        >
          <ColourfulText
            text="Play"
            colors={colors}
            component={<Play width={50} height={50} />}
            className="uppercase tracking-widest"
          />
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
