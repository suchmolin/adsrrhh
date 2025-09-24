"use client"

import { forwardRef } from "react"

// Component that adds suppressHydrationWarning to prevent browser extension conflicts
const BrowserExtensionSafe = forwardRef(({ children, ...props }, ref) => {
    return (
        <div {...props} ref={ref} suppressHydrationWarning>
            {children}
        </div>
    )
})

BrowserExtensionSafe.displayName = "BrowserExtensionSafe"

export default BrowserExtensionSafe
