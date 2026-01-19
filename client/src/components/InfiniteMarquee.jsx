// import { useScreenWidth } from "@/hooks/useScreenSize";
import { useRef, useState, useEffect, ReactNode } from "react";

export default function InfiniteMarquee({
  children,
  speed = 20,
  className = "",
  background,
  textPosition = "justify-center",
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  // const screenWidth = useScreenWidth();

  const renderedChildren =
    typeof children === "function" ? children(shouldScroll) : children;

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!container || !content) return;

      const cWidth = container.offsetWidth;
      const tWidth = content.scrollWidth;

      setContainerWidth(cWidth);
      setContentWidth(tWidth);
      setShouldScroll(tWidth > cWidth);
    };

    const id = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => measure());

    if (containerRef.current) ro.observe(containerRef.current);
    if (contentRef.current) ro.observe(contentRef.current);

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, [children]);

  useEffect(() => {
    if (!shouldScroll || !contentWidth || !containerRef.current) return;

    const track = containerRef.current.querySelector(".track");
    let offset = 0;
    let last = performance.now();
    let raf;

    const animate = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      offset -= speed * dt;
      const x = offset % contentWidth;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [speed, contentWidth, shouldScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ background }}
    >
      <div
        className={`track flex items-center ${
          shouldScroll ? "will-change-transform" : textPosition
        }`}
        style={{
          transform: shouldScroll ? undefined : "translate3d(0,0,0)",
        }}
      >
        <div ref={contentRef} className="flex flex-shrink-0 items-center">
          {renderedChildren}
        </div>
        {shouldScroll && (
          <div className="flex flex-shrink-0 items-center">
            {renderedChildren}
          </div>
        )}
      </div>
    </div>
  );
}
