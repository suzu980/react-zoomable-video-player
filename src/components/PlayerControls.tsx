import { Dispatch, SetStateAction } from "react";
import { Minus, Plus, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import ReactPlayer from "react-player";

interface PlayerControlsProps {
  playerRef: React.RefObject<ReactPlayer>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
  frameTime: number;
}

const PlayerControls = ({
  playerRef,
  playing,
  setPlaying,
  playbackRate,
  setPlaybackRate,
  frameTime = 1 / 30,
  played,
  setPlayed,
}: PlayerControlsProps) => {
  const handleFrameStep = (forward = true) => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + (forward ? frameTime : -frameTime));
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Control Panel */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() => handleFrameStep(false)}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className="p-2 hover:bg-gray-200 rounded"
          >
            {playing ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => handleFrameStep(true)}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() =>
              setPlaybackRate((rate) => Math.max(0.25, rate - 0.25))
            }
            className="p-2 hover:bg-gray-200 rounded"
          >
            <Minus className="w-6 h-6" />
          </button>

          <span className="text-sm font-medium select-none">
            {playbackRate}x
          </span>

          <button
            onClick={() => setPlaybackRate((rate) => Math.min(2, rate + 0.25))}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={(e) => {
              const time = parseFloat(e.target.value);
              playerRef.current?.seekTo(time);
              setPlayed(time);
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
export default PlayerControls;
