import type { Country } from '@/types'
import { continentTheme } from '@/lib/continentTheme'

interface CountryCardProps {
    country: Country
}

export function CountryCard({ country }: CountryCardProps) {
    const theme = continentTheme[country.continent]

    return (
        <article
            data-continent={country.continent}
            className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-transform duration-200 ease-snappy hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative aspect-video w-full overflow-hidden">
                <img
                    src={country.image}
                    alt={`Flag of ${country.name}`}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className={`flex flex-1 flex-col gap-3 p-3 sm:p-4 lg:p-5 ${theme.cardBg}`}>
                <div>
                    <p className={`text-xs font-semibold uppercase tracking-wide ${theme.labelText}`}>
                        {country.continent}
                    </p>
                    <h3 className={`mt-0.5 text-lg font-bold leading-tight ${theme.bodyText}`}>{country.name}</h3>
                    <p className={`mt-1 text-sm ${theme.bodyText}`}>{country.shortInfo}</p>
                </div>

                <dl className="mt-auto grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border pt-3 text-sm">
                    <div>
                        <dt className={`text-xs uppercase tracking-wide ${theme.labelText}`}>Capital</dt>
                        <dd className={theme.bodyText}>{country.capital}</dd>
                    </div>
                    <div>
                        <dt className={`text-xs uppercase tracking-wide ${theme.labelText}`}>Language</dt>
                        <dd className={theme.bodyText}>{country.language}</dd>
                    </div>
                    <div>
                        <dt className={`text-xs uppercase tracking-wide ${theme.labelText}`}>Population</dt>
                        <dd className={`font-mono tabular-nums ${theme.bodyText}`}>
                            {country.population.toLocaleString()}
                        </dd>
                    </div>
                    <div>
                        <dt className={`text-xs uppercase tracking-wide ${theme.labelText}`}>Area</dt>
                        <dd className={`font-mono tabular-nums ${theme.bodyText}`}>
                            {country.totalArea.toLocaleString()} km²
                        </dd>
                    </div>
                </dl>
            </div>
        </article>
    )
}