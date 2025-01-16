import { useEffect } from "react";

interface ImageSetViewerProps {
  imageLinks: string[];
  currentImage: number;
}
const ImageSetViewer = ({ imageLinks, currentImage }: ImageSetViewerProps) => {
  const preloadImages = (imageLinks: string[]) => {
    imageLinks.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };
  useEffect(() => {
    preloadImages(imageLinks);
  }, []);
  return (
    <div className="h-full w-full flex justify-center items-center">
      {imageLinks.length > 0 ? (
        <img src={imageLinks[currentImage]} className="h-full" />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default ImageSetViewer;
