import { ZoomOut, ZoomIn, RefreshCw } from "lucide-react";
import { cn } from "../utils/cn";

interface ZoomableContainerControlsProp {
  className?: string;
  handleZoom: (increment: number) => void;
  resetZoomPan: () => void;
  zoom: number;
}
const ZoomableContainerControls = ({
  className,
  handleZoom,
  zoom,
  resetZoomPan,
}: ZoomableContainerControlsProp) => {
  const buttonClasses =
    "p-2 hover:bg-gray-200 rounded hover:dark:bg-gray-700 transition-colors";
  return (
    <div
      className={cn("flex items-center justify-center space-x-4", className)}
    >
      <button onClick={() => handleZoom(-0.5)} className={cn(buttonClasses)}>
        <ZoomOut className="w-6 h-6" />
      </button>

      <span className="text-sm font-medium select-none">
        {Math.round(zoom * 100)}%
      </span>

      <button onClick={() => handleZoom(0.5)} className={cn(buttonClasses)}>
        <ZoomIn className="w-6 h-6" />
      </button>

      <button onClick={resetZoomPan} className={cn(buttonClasses)}>
        <RefreshCw className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ZoomableContainerControls;
