import { useRef, useState } from "react";
import ZoomableContainer from "./components/ZoomableContainer";
import ZoomableContainerControls from "./components/ZoomControls";
import ReactPlayer from "react-player";
import PlayerControls from "./components/PlayerControls";

function App() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seeking, setSeeking] = useState(false);

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
      <div className="p-4">
        <div className="flex flex-col items-center">
          <ZoomableContainer
            zoom={zoom}
            setPan={setPan}
            pan={pan}
            className="border max-h-[720px] max-w-[1280px] w-full bg-black"
            innerContainerClassName="max-h-[720px] max-w-[1280px]"
          >
            <ReactPlayer
              ref={playerRef}
              loop={false}
              controls={false}
              style={{ pointerEvents: "none" }}
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
