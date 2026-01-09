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
      className="flex h-[360px] w-[450px] m-auto rounded-lg uppercase overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(254,154,0)] hover:shadow-[0_0_30px_rgba(254,154,0)] max-[1800px]:h-[310px] max-[1800px]:w-[400px] max-[1600px]:h-[260px] max-[1600px]:w-[350px] max-[1400px]:h-[220px] max-[1400px]:w-[300px]"
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
          className="flex-1 flex items-center self-center font-bold text-[100px] max-[1800px]:text-[90px] max-[1600px]:text-[80px] max-[1400px]:text-[60px]"
        >
          <ColourfulText
            text="Play"
            colors={colors}
            component={
              <Play
                width={50}
                height={50}
                className="max-[1800px]:w-[45px] max-[1800px]:h-[45px] max-[1600px]:w-[40px] max-[1600px]:h-[40px] max-[1400px]:w-[35px] max-[1400px]:h-[35px]"
              />
            }
            className="uppercase tracking-widest"
          />
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
