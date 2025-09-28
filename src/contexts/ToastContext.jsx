import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random()
    const newToast = { id, message, type, duration }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((message, duration) => {
    addToast(message, 'success', duration)
  }, [addToast])

  const showError = useCallback((message, duration) => {
    addToast(message, 'error', duration)
  }, [addToast])

  const showInfo = useCallback((message, duration) => {
    addToast(message, 'info', duration)
  }, [addToast])

  const showWarning = useCallback((message, duration) => {
    addToast(message, 'warning', duration)
  }, [addToast])

  const value = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

const Toast = ({ toast, onRemove }) => {
  const { id, message, type } = toast

  const getToastStyles = () => {
    const baseStyles = "p-4 rounded-lg shadow-lg flex items-center justify-between min-w-80 max-w-md transition-all transform"
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white`
      case 'error':
        return `${baseStyles} bg-red-500 text-white`
      case 'warning':
        return `${baseStyles} bg-yellow-500 text-white`
      default:
        return `${baseStyles} bg-blue-500 text-white`
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      default:
        return 'ℹ'
    }
  }

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center">
        <span className="mr-2 text-lg">{getIcon()}</span>
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="ml-4 text-white hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  )
}

export default ToastProvider