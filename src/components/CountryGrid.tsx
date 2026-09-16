import type { Country } from '@/types'
import { CountryCard } from '@/components/CountryCard'

interface CountryGridProps {
    countries: Country[]
}

const MAX_VISIBLE_COUNTRIES = 12

export function CountryGrid({ countries }: CountryGridProps) {
    const visibleCountries = countries.slice(0, MAX_VISIBLE_COUNTRIES)

    return (
        <section aria-labelledby="country-grid-heading">
            <h2 id="country-grid-heading" className="sr-only">
                Country list
            </h2>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {visibleCountries.map(country => (
                    <li key={country.name}>
                        <CountryCard country={country} />
                    </li>
                ))}
            </ul>
        </section>
    )
}