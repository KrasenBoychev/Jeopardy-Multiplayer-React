import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectFirstPlayer } from "../playersSlice";
import Categories from "../03. categories/Categories";

export default function StartingPlayer() {
  const [isVisible, setIsVisible] = useState(false);
  const firstPlayer = useSelector(selectFirstPlayer);
  const [renderCategories, setRenderCategories] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        setRenderCategories(true);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    fontWeight: "bold",
    color: "var(--accent-foreground)",
  };

  return (
    <div className="flex flex-1 relative w-full h-[100vh] flex-col items-center justify-center gap-8 bg-[url(planet.png)] bg-cover bg-center">
      {renderCategories ? (
        <Categories />
      ) : (
        <>
          <p className="text-6xl text-chart-4 font-bold uppercase bg-[#104e6495] p-4 rounded-lg shadow-lg max-[1600px]:text-5xl max-[1400px]:text-4xl">
            Game will start
          </p>
          <div style={style}>
            <p className="text-chart-4 text-5xl max-[1600px]:text-4xl max-[1400px]:text-3xl">
              {firstPlayer.username}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
