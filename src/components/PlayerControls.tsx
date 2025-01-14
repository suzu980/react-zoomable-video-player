import { Dispatch, SetStateAction } from "react";
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume,
  Volume1,
  Volume2,
} from "lucide-react";
import ReactPlayer from "react-player";
import { cn } from "../utils/cn";
import VideoSpeedControls from "./VideoSpeedControls";
import Duration from "../helpers/Duration";

interface PlayerControlsProps {
  playerRef: React.RefObject<ReactPlayer>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
  frameTime: number;
  setSeeking: Dispatch<SetStateAction<boolean>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  duration: number;
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
  setSeeking,
  volume,
  setVolume,
  duration,
}: PlayerControlsProps) => {
  const handleFrameStep = (forward = true) => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + (forward ? frameTime : -frameTime));
    }
  };
  const buttonClasses =
    "p-2 hover:bg-gray-200 rounded hover:dark:bg-gray-700 transition-colors";

  return (
    <div className="w-full max-w-4xl mx-auto p-2">
      {/* Control Panel */}
      <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <button
              onClick={() => (volume === 0 ? setVolume(0.5) : setVolume(0))}
              className={cn(buttonClasses)}
            >
              {volume === 0 && <Volume />}
              {volume > 0 && volume < 0.5 && <Volume1 />}
              {volume >= 0.5 && <Volume2 />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={"any"}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full max-w-[100px] md:max-w-[200px]"
            />
          </div>
          <VideoSpeedControls
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
          />
        </div>
        {/* Progress Bar */}
        <div className="mt-4">
          <Duration seconds={duration * played} />
          {" / "}
          <Duration seconds={duration} />
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={0.999999}
            step={"any"}
            value={played}
            onMouseDown={(e) => {
              setSeeking(true);
            }}
            onMouseUp={(e: React.MouseEvent<HTMLInputElement>) => {
              setSeeking(false);
              const value = (e.target as HTMLInputElement).value;
              playerRef.current?.seekTo(parseFloat(value));
            }}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setPlayed(value);
            }}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-center space-x-4 mb-1">
          <button
            onClick={() => handleFrameStep(false)}
            className={cn(buttonClasses)}
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            onClick={() => setPlaying(!playing)}
            className={cn(buttonClasses)}
          >
            {playing ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => handleFrameStep(true)}
            className={cn(buttonClasses)}
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlayerControls;
