import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '@/types/theme'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    const toggle = useCallback(() => {
        setTheme(t => (t === 'dark' ? 'light' : 'dark'))
    }, [])

    return { theme, setTheme, toggle }
}