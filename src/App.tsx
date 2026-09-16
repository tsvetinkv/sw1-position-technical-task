import { useCountries } from '@/hooks/useCountries'
import { CountryGrid } from '@/components/CountryGrid'
import { Legend } from '@/components/Legend'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Loader } from '@/components/Loader'
import { ErrorState } from '@/components/ErrorState'

function App() {
    const state = useCountries()

    if (state.status === 'loading') {
        return <Loader />
    }
    if (state.status === 'error') {
        return <ErrorState message={state.error} />
    }

    return (
        <main className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-fg sm:text-3xl">Countries of the World</h1>
                <ThemeToggle />
            </div>

            <div className="mt-4 sm:mt-5">
                <Legend />
            </div>

            <div className="mt-8 sm:mt-10">
                <CountryGrid countries={state.data} />
            </div>
        </main>
    )
}

export default App