import { useRef, useState } from "react";
import ZoomableContainer from "./components/ZoomableContainer";
import ZoomableContainerControls from "./components/ZoomControls";
import ReactPlayer from "react-player";
import PlayerControls from "./components/PlayerControls";
import { Moon, Sun } from "lucide-react";
import useDark from "./hooks/useDark";

function App() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);

  const { isDark, toggleDarkMode } = useDark();

  const frameTime = 1 / 30;

  const handleZoom = (increment: number) => {
    setZoom((prev) => {
      const newZoom = Math.max(1, Math.min(5, prev + increment));
      if (newZoom === 1) {
        setPan({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };
  const resetZoomPan = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const playerRef = useRef<ReactPlayer>(null);

  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
        <div className="flex flex-col items-center gap-y-2">
          <div className="font-medium text-xl font-mono">
            Zoomable React Video Player
          </div>
          <div className="text-sm">Experimental React Video Player</div>
          <div className="bg-gray-100 dark:bg-gray-800 w-full flex justify-end p-2 rounded-lg transition-colors">
            <div
              className="p-2 hover:bg-gray-200 hover:dark:bg-gray-700 transition-colors rounded-full"
              onClick={() => toggleDarkMode()}
            >
              {isDark ? <Moon /> : <Sun />}
            </div>
          </div>
          <ZoomableContainer
            zoom={zoom}
            setPan={setPan}
            pan={pan}
            className="max-h-[70vh] max-w-[1280px] w-full bg-black"
            innerContainerClassName="max-h-[720px] max-w-[1280px]"
          >
            <ReactPlayer
              ref={playerRef}
              loop={false}
              controls={false}
              volume={volume}
              onDuration={(duration) => setDuration(duration)}
              style={{ pointerEvents: "none", userSelect: "none" }}
              config={{
                file: {
                  attributes: { disablePictureInPicture: true },
                },
              }}
              playing={playing}
              playbackRate={playbackRate}
              onProgress={({ played }) => {
                if (!seeking) setPlayed(played);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              width={"100%"}
              height={"100%"}
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
          </ZoomableContainer>
          <ZoomableContainerControls
            handleZoom={handleZoom}
            resetZoomPan={resetZoomPan}
            zoom={zoom}
          />
          <PlayerControls
            duration={duration}
            volume={volume}
            setVolume={setVolume}
            setSeeking={setSeeking}
            playerRef={playerRef}
            playing={playing}
            setPlaying={setPlaying}
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
            played={played}
            setPlayed={setPlayed}
            frameTime={frameTime}
          />
        </div>
      </div>
    </>
  );
}

export default App;
