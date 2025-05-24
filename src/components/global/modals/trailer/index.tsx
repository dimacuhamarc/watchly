import { FaTimes } from 'react-icons/fa'
import { useEffect } from 'react'
import { disableScroll, enableScroll } from '~/helpers/scroll-lock'
import { useFadeIn } from '~/hooks/useFadeIn/useFadeIn'

interface TrailerProps {
  videoKey: string
  isOpen: boolean
  onClose: () => void
}

function Trailer({ videoKey, isOpen, onClose }: TrailerProps) {
  const ref = useFadeIn<HTMLDivElement>()
  useEffect(() => {
    if (isOpen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    enableScroll()
  }

  if (!isOpen) return null

  if (!videoKey) {
    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center opacity-0 transition-opacity duration-700"
      >
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-sm"
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
    )
  }

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center opacity-0 transition-opacity duration-700"
    >
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-6xl scale-75 lg:scale-100">
        <div className="max-w-screen aspect-video w-full">
          <iframe
            className="h-full w-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
          ></iframe>
        </div>
        <button
          className="absolute -right-10 -top-0.5 text-white hover:text-gray-300 lg:-top-10 lg:right-0"
          onClick={handleClose}
        >
          <div className="btn btn-circle btn-sm" onClick={handleClose}>
            <FaTimes />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Trailer
