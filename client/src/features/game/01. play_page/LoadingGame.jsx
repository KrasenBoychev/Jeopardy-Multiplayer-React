import { ColourfulText } from "@/components/ui/colourful-text";

export function LoadingGame() {
  const colors = ["#33FF57"];

  return (
    <div className="flex-1 flex flex-col uppercase items-center justify-center flex font-bold text-5xl bg-[#00000095] max-[1600px]:text-4xl max-[1400px]:text-3xl">
      <div className="flex-1"></div>
      <div className="flex-1 flex items-center justify-center text-chart-2">
        <ColourfulText text="Loading Game..." colors={colors} />
      </div>
    </div>
  );
}
