import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { disableScroll, enableScroll } from "~/helpers/scroll-lock";
import Image from "next/image";
import { useFadeIn } from "~/hooks/useFadeIn/useFadeIn";
interface PosterProps {
  posterPath: string;
  isOpen: boolean;
  onClose: () => void;
}

function Poster({ posterPath, isOpen, onClose }: PosterProps) {
  const ref = useFadeIn<HTMLDivElement>();
  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    enableScroll();
  };

  if (!isOpen) return null;

  if (!posterPath) {
    return (
      <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-sm"
          onClick={handleClose}
        ></div>
        <div className="relative z-50 w-full max-w-6xl p-4 text-center text-white">
          <p>No Poster available for this movie</p>
          <button
            className="mt-4 text-white hover:text-gray-300"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center opacity-0 transition-opacity duration-700">
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-auto">
        <div className="relative mx-auto h-[800px] w-[533px] md:scale-100 scale-75">
          <button
            className="absolute z-50 top-4 right-4 text-white hover:text-gray-300"
            onClick={handleClose}
          >
            <div className="btn btn-circle btn-sm">
              <FaTimes />
            </div>
          </button>
          <Image 
            src={`https://image.tmdb.org/t/p/original/${posterPath}`} 
            alt="Poster" 
            fill
            className="rounded-lg object-contain"
            sizes="(max-width: 533px) 100vw, 533px"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Poster;
