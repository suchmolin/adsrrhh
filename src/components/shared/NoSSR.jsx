"use client"

import { useEffect, useState } from "react"

// NoSSR component to prevent server-side rendering and hydration issues
const NoSSR = ({ children, fallback = null }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return fallback
    }

    return children
}

export default NoSSR
