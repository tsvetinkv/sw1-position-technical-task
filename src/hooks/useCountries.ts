import { useEffect, useState } from 'react'
import { fetchCountries } from '@/lib/api'
import type { Country } from '@/types'

type CountriesState =
    | { status: 'loading' }
    | { status: 'success'; data: Country[] }
    | { status: 'error'; error: string }

export function useCountries(): CountriesState {
    const [state, setState] = useState<CountriesState>({ status: 'loading' })

    useEffect(() => {
        const controller = new AbortController()

        async function loadCountries() {
            try {
                const data = await fetchCountries(controller.signal)
                if (controller.signal.aborted) return
                setState({ status: 'success', data })
            } catch (err: unknown) {
                if (controller.signal.aborted) return
                const message = err instanceof Error ? err.message : 'Unknown error occurred'
                setState({ status: 'error', error: message })
            }
        }

        void loadCountries()

        return () => {
            controller.abort()
        }
    }, [])

    return state
}