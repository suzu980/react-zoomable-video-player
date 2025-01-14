import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";

interface ZoomableContainerProps {
  children: React.ReactNode;
  zoom: number;
  pan: { x: number; y: number };
  setPan: Dispatch<SetStateAction<{ x: number; y: number }>>;
  innerContainerClassName?: string;
  className?: string;
}
const ZoomableContainer = ({
  children,
  zoom,
  pan,
  setPan,
  innerContainerClassName,
  className,
}: ZoomableContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setContainerSize({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1 && containerRef.current) {
      const deltaX = (e.clientX - lastMousePos.current.x) / zoom;
      const deltaY = (e.clientY - lastMousePos.current.y) / zoom;

      let newX = pan.x + deltaX;
      let newY = pan.y + deltaY;

      setPan({ x: newX, y: newY });

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden aspect-video",
        "flex items-center justify-center",
        { "cursor-grabbing": isDragging },
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transition: isDragging ? "none" : "transform 0.1s",
          width: containerSize.width,
          height: containerSize.height,
        }}
        className={cn(
          "origin-center pointer-events-none aspect-video",
          innerContainerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default ZoomableContainer;
