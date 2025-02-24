import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { disableScroll, enableScroll } from "~/utils/dom/scroll-lock";

interface TrailerProps {
  videoKey: string;
  isOpen: boolean;
  onClose: () => void;
}

function Trailer({ videoKey, isOpen, onClose }: TrailerProps) {
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

  if (!videoKey) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-75"
          onClick={handleClose}
        ></div>
        <div className="relative z-50 w-full max-w-6xl p-4 text-center text-white">
          <p>No trailer available for this movie</p>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-6xl">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
          ></iframe>
        </div>
        <button
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
          onClick={handleClose}
        >
          <div className="btn btn-circle btn-sm" onClick={handleClose}>
            <FaTimes />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Trailer;
