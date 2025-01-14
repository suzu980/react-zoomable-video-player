import { Dispatch, SetStateAction } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../utils/cn";
interface VideoSpeedControlsProps {
  playbackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
  className?: string;
}
const VideoSpeedControls = ({
  playbackRate,
  setPlaybackRate,
  className,
}: VideoSpeedControlsProps) => {
  const buttonClasses =
    "p-2 hover:bg-gray-200 rounded hover:dark:bg-gray-700 transition-colors";
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-4 mb-1",
        className
      )}
    >
      <button
        onClick={() => setPlaybackRate((rate) => Math.max(0.25, rate - 0.25))}
        className={cn(buttonClasses)}
      >
        <Minus className="w-6 h-6" />
      </button>

      <span className="text-sm font-medium select-none w-[40px] text-center">
        {playbackRate}x
      </span>

      <button
        onClick={() => setPlaybackRate((rate) => Math.min(2, rate + 0.25))}
        className={cn(buttonClasses)}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideoSpeedControls;
