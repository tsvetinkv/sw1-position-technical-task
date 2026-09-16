import type { Country } from '@/types'
import { CountryCard } from '@/components/CountryCard'

interface CountryGridProps {
    results: Country[]
    allCount: number
}

const MAX_VISIBLE_COUNTRIES = 12

export function CountryGrid({ results, allCount }: CountryGridProps) {
    const visibleCountries = results.slice(0, MAX_VISIBLE_COUNTRIES)
    const matchCount = results.length

    return (
        <section aria-labelledby="country-grid-heading">
            <h2 id="country-grid-heading" className="sr-only">
                Country list
            </h2>

            <p aria-live="polite" className="mb-4 text-sm text-muted-fg">
                {matchCount === 0
                    ? `No countries match your filters (0 of ${allCount})`
                    : `Showing ${visibleCountries.length} of ${matchCount}${matchCount !== allCount ? ` (filtered from ${allCount})` : ''
                    }`}
            </p>

            {matchCount === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border bg-surface p-10 text-center">
                    <p className="text-base font-semibold text-fg">No countries found</p>
                    <p className="max-w-sm text-sm text-muted-fg">
                        Try a different search term or clear the continent filter to see more results.
                    </p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                    {visibleCountries.map(country => (
                        <li key={country.name}>
                            <CountryCard country={country} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}