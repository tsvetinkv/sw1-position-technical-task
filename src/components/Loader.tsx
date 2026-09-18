import { useEffect, useState } from 'react'

interface LoaderProps {
    durationMs?: number
}

export function Loader({ durationMs = 1500 }: LoaderProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const startTime = Date.now()
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const nextProgress = Math.min(100, (elapsed / durationMs) * 100)
            setProgress(nextProgress)

            if (nextProgress >= 100) clearInterval(interval)
        }, 50)

        return () => clearInterval(interval)
    }, [durationMs])

    return (
        <div role="status" aria-live="polite" className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
            <p className="text-2xl font-semibold leading-7 text-fg">Loading countries…</p>
            <div
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2 w-64 overflow-hidden rounded-full bg-border"
            >
                <div
                    className="h-full rounded-full bg-fg transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}