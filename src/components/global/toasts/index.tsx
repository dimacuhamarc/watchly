import React from 'react'
import './index.css'

interface ToastProps {
  type: 'info' | 'success' | 'error',
  message?: string,
  show?: boolean,
}
function Toast({ type = 'info', message, show }: ToastProps) {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        const toast = document.querySelector('.toast')
        if (toast && toast instanceof HTMLElement) {
          toast.style.opacity = '0'
          setTimeout(() => {
            toast.style.display = 'none'
          }, 300)
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show])

  return (
    <div className="toast">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast