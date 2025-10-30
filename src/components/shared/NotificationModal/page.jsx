"use client"

import { useState, useEffect } from "react"

export default function NotificationModal({
    isOpen,
    onClose,
    title = "Notificación",
    message = "",
    type = "info", // info, success, error, warning
    autoClose = true,
    duration = 3000
}) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            if (autoClose) {
                const timer = setTimeout(() => {
                    handleClose()
                }, duration)
                return () => clearTimeout(timer)
            }
        }
    }, [isOpen, autoClose, duration])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 300) // Wait for animation to complete
    }

    if (!isOpen) return null

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return {
                    icon: (
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                    textColor: "text-green-800",
                    iconBg: "bg-green-100"
                }
            case 'error':
                return {
                    icon: (
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    textColor: "text-red-800",
                    iconBg: "bg-red-100"
                }
            case 'warning':
                return {
                    icon: (
                        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    ),
                    bgColor: "bg-yellow-50",
                    borderColor: "border-yellow-200",
                    textColor: "text-yellow-800",
                    iconBg: "bg-yellow-100"
                }
            default: // info
                return {
                    icon: (
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    bgColor: "bg-blue-50",
                    borderColor: "border-blue-200",
                    textColor: "text-blue-800",
                    iconBg: "bg-blue-100"
                }
        }
    }

    const styles = getTypeStyles()

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className={`relative ${styles.bgColor} rounded-lg shadow-xl max-w-md w-full border-2 ${styles.borderColor} transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 ${styles.iconBg} rounded-full p-2`}>
                                {styles.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-lg font-semibold ${styles.textColor} mb-2`}>
                                    {title}
                                </h3>
                                <p className={`${styles.textColor}`}>
                                    {message}
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6">
                        <button
                            onClick={handleClose}
                            className={`w-full px-4 py-2 ${styles.textColor} bg-white border ${styles.borderColor} rounded-lg hover:bg-gray-50 transition-colors font-semibold`}
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
