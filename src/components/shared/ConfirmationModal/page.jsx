"use client"

import { useState } from "react"

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar acción",
    message = "¿Estás seguro de que quieres realizar esta acción?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "warning" // warning, danger, info, success
}) {
    if (!isOpen) return null

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: (
                        <svg className="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    ),
                    confirmButton: "bg-red-600 hover:bg-red-700 text-white",
                    borderColor: "border-red-200"
                }
            case 'success':
                return {
                    icon: (
                        <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    confirmButton: "bg-green-600 hover:bg-green-700 text-white",
                    borderColor: "border-green-200"
                }
            case 'info':
                return {
                    icon: (
                        <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    confirmButton: "bg-blue-600 hover:bg-blue-700 text-white",
                    borderColor: "border-blue-200"
                }
            default: // warning
                return {
                    icon: (
                        <svg className="w-12 h-12 text-yellow-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    ),
                    confirmButton: "bg-yellow-600 hover:bg-yellow-700 text-white",
                    borderColor: "border-yellow-200"
                }
        }
    }

    const styles = getTypeStyles()

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full border-2 ${styles.borderColor}`}>
                    {/* Header */}
                    <div className="p-6 text-center">
                        {styles.icon}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-gray-600">
                            {message}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className={`flex ${cancelText ? 'justify-end gap-3' : 'justify-center'} p-6 border-t border-gray-200 bg-gray-50`}>
                        {cancelText && (
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {cancelText}
                            </button>
                        )}
                        <button
                            onClick={handleConfirm}
                            className={`px-4 py-2 rounded-lg transition-colors font-semibold ${styles.confirmButton}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
