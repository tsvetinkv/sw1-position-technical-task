import { useMemo, useState } from 'react'
import { useCountries } from '@/hooks/useCountries'
import { CountryGrid } from '@/components/CountryGrid'
import { CountryControls } from '@/components/CountryControls'
import { Legend } from '@/components/Legend'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Loader } from '@/components/Loader'
import { ErrorState } from '@/components/ErrorState'
import { filterAndSortCountries, type SortDirection, type SortKey } from '@/lib/filterSortCountries'
import type { Continent } from '@/types'

function App() {
    const state = useCountries()

    const [searchQuery, setSearchQuery] = useState('')
    const [activeContinent, setActiveContinent] = useState<Continent | null>(null)
    const [sortKey, setSortKey] = useState<SortKey>('name')
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

    const countries = useMemo(() => (state.status === 'success' ? state.data : []), [state])

    const filteredCountries = useMemo(
        () =>
            filterAndSortCountries(countries, {
                searchQuery,
                activeContinent,
                sortKey,
                sortDirection,
            }),
        [countries, searchQuery, activeContinent, sortKey, sortDirection]
    )

    // ...rest unchanged
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
                <Legend
                    activeContinent={activeContinent}
                    onSelectContinent={setActiveContinent}
                    onClearContinent={() => setActiveContinent(null)}
                />
            </div>

            <div className="mt-4 sm:mt-5">
                <CountryControls
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSortKeyChange={setSortKey}
                    onSortDirectionChange={setSortDirection}
                />
            </div>

            <div className="mt-8 sm:mt-10">
                <CountryGrid results={filteredCountries} allCount={countries.length} />
            </div>
        </main>
    )
}

export default App