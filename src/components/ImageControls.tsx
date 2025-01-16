import { Dispatch, SetStateAction } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import { cn } from "../utils/cn";

interface ImageControlsProps {
  currentImage: number;
  imagesAmount: number;
  setCurrentImage: Dispatch<SetStateAction<number>>;
}

const ImageControls = ({
  currentImage,
  imagesAmount,
  setCurrentImage,
}: ImageControlsProps) => {
  const buttonClasses =
    "p-2 hover:bg-gray-200 rounded hover:dark:bg-gray-700 transition-colors";

  return (
    <div className="w-full max-w-4xl mx-auto p-3">
      {/* Control Panel */}
      <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
        <div className="flex items-center justify-center space-x-12 mb-1">
          <button
            className={cn(buttonClasses)}
            onClick={() => {
              if (currentImage - 1 < 0) return;
              setCurrentImage(currentImage - 1);
            }}
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            className={cn(buttonClasses)}
            onClick={() => {
              if (currentImage + 1 > imagesAmount - 1) return;
              setCurrentImage(currentImage + 1);
            }}
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageControls;
