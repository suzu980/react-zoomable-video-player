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
const calculateConstraints = (
  newX: number,
  newY: number,
  zoom: number,
  container: HTMLElement,
  content: HTMLElement
) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const contentWidth = content.offsetWidth * zoom;
  const contentHeight = content.offsetHeight * zoom;

  // Constrain pan horizontally (x-axis)
  const maxX = (contentWidth - containerWidth) / 2; // Left boundary (no panning left)
  const maxY = (contentHeight - containerHeight) / 2; // Top boundary (no panning up)
  const positiveX = newX > 0;
  const positiveY = newY > 0;
  const isXConstrained = Math.abs(newX * zoom) > maxX;
  const isYConstrained = Math.abs(newY * zoom) > maxY;
  const constrainedX = isXConstrained
    ? positiveX
      ? maxX / zoom
      : -maxX / zoom
    : newX;
  const constrainedY = isYConstrained
    ? positiveY
      ? maxY / zoom
      : -maxY / zoom
    : newY;
  return { constrainedX, constrainedY };
};

const ZoomableContainer = ({
  children,
  zoom,
  pan,
  setPan,
  innerContainerClassName,
  className,
}: ZoomableContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;
    if (zoom > 1) {
      setIsDragging(true);
      lastMousePos.current = { x: clientX, y: clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1 && containerRef.current && contentRef.current) {
      const deltaX = (e.clientX - lastMousePos.current.x) / zoom;
      const deltaY = (e.clientY - lastMousePos.current.y) / zoom;

      let newX = pan.x + deltaX;
      let newY = pan.y + deltaY;
      const { constrainedX, constrainedY } = calculateConstraints(
        newX,
        newY,
        zoom,
        containerRef.current,
        contentRef.current
      );
      setPan({ x: constrainedX, y: constrainedY });

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && containerRef.current && contentRef.current) {
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const deltaX = (clientX - lastMousePos.current.x) / zoom;
      const deltaY = (clientY - lastMousePos.current.y) / zoom;

      let newX = pan.x + deltaX;
      let newY = pan.y + deltaY;
      const { constrainedX, constrainedY } = calculateConstraints(
        newX,
        newY,
        zoom,
        containerRef.current,
        contentRef.current
      );

      setPan({ x: constrainedX, y: constrainedY });

      lastMousePos.current = { x: clientX, y: clientY };
    }
  };
  useEffect(() => {
    console.log(zoom);
    if (containerRef.current && contentRef.current) {
      const { constrainedX, constrainedY } = calculateConstraints(
        pan.x,
        pan.y,
        zoom,
        containerRef.current,
        contentRef.current
      );
      setPan({ x: constrainedX, y: constrainedY });
    }
  }, [zoom]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-black",
        "h-full w-full",
        "overflow-hidden",
        { "cursor-grabbing": isDragging },
        "touch-none select-none",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transition: isDragging ? "none" : "transform 0.25s",
        }}
        className={cn(
          "origin-center pointer-events-none ",
          innerContainerClassName,
          "h-full w-full"
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default ZoomableContainer;
