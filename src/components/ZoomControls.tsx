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
  return (
    <div
      className={cn("flex items-center justify-center space-x-4", className)}
    >
      <button
        onClick={() => handleZoom(-0.5)}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <ZoomOut className="w-6 h-6" />
      </button>

      <span className="text-sm font-medium select-none">
        {Math.round(zoom * 100)}%
      </span>

      <button
        onClick={() => handleZoom(0.5)}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <ZoomIn className="w-6 h-6" />
      </button>

      <button onClick={resetZoomPan} className="p-2 hover:bg-gray-200 rounded">
        <RefreshCw className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ZoomableContainerControls;
