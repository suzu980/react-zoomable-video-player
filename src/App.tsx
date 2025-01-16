import { useEffect, useRef, useState } from "react";
import ZoomableContainer from "./components/ZoomableContainer";
import ZoomableContainerControls from "./components/ZoomControls";
import ReactPlayer from "react-player";
import PlayerControls from "./components/PlayerControls";
import { Image, ImageOff, Moon, Sun } from "lucide-react";
import useDark from "./hooks/useDark";
import ImageControls from "./components/ImageControls";
import ImageSetViewer from "./components/ImageSetViewer";

function App() {
  const { isDark, toggleDarkMode } = useDark();

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.2);

  const [isImage, setIsImage] = useState(false);

  const imageLinks = [
    "https://images.unsplash.com/photo-1735040736883-9e0bc7e6f1ba?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1735506266367-d6941df3efdc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [currentImage, setCurrentImage] = useState(0);

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

  useEffect(() => {
    setPlaying(false);
    setCurrentImage(0);
  }, [isImage]);

  const playerRef = useRef<ReactPlayer>(null);

  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
        <div className="flex flex-col items-center gap-y-2">
          <div className="bg-gray-100 dark:bg-gray-800 w-full flex justify-between p-2 rounded-lg transition-colors max-w-[1280px]">
            <div
              className="p-2 hover:bg-gray-200 hover:dark:bg-gray-700 transition-colors rounded-full"
              onClick={() => setIsImage(!isImage)}
            >
              {isImage ? <Image /> : <ImageOff />}
            </div>
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
            className="bg-black max-h-[70vh] max-w-[1280px] aspect-video"
          >
            {!isImage ? (
              <>
                {/*Responsive player wrapper at 16:9 ratio*/}
                <ReactPlayer
                  ref={playerRef}
                  muted={muted}
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
              </>
            ) : (
              <ImageSetViewer
                imageLinks={imageLinks}
                currentImage={currentImage}
              />
            )}
          </ZoomableContainer>
          <ZoomableContainerControls
            handleZoom={handleZoom}
            resetZoomPan={resetZoomPan}
            zoom={zoom}
          />
          {isImage ? (
            <ImageControls
              imagesAmount={imageLinks.length}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          ) : (
            <PlayerControls
              muted={muted}
              setMuted={setMuted}
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
          )}
        </div>
      </div>
    </>
  );
}

export default App;
