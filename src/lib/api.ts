import type { Country } from '@/types'

export const SIMULATED_DELAY_MS = 1500

const SIMULATE_ERROR = false;

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
    await delay(SIMULATED_DELAY_MS)

    if (SIMULATE_ERROR) {
        throw new Error('Simulated network failure: could not reach countries.json')
    }

    const response = await fetch('/countries.json', { signal })

    if (!response.ok) {
        throw new Error(
            `Failed to fetch countries: ${response.status} ${response.statusText}`
        )
    }

    const data: unknown = await response.json()

    if (!Array.isArray(data)) {
        throw new Error('Failed to fetch countries: expected an array response')
    }

    return data as Country[]
}