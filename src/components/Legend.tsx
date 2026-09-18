import { cn } from '@/lib/cn'
import { continentTheme } from '@/lib/continentTheme'
import type { Continent } from '@/types'

const ALL_CONTINENTS: Continent[] = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Oceania',
]

interface LegendProps {
    activeContinent: Continent | null
    onSelectContinent: (continent: Continent) => void
    onClearContinent: () => void
}

export function Legend({ activeContinent, onSelectContinent, onClearContinent }: LegendProps) {
    return (
        <div
            role="group"
            aria-label="Filter countries by continent"
            className="flex flex-wrap items-center gap-2 rounded-full p-1"
        >
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-fg">
                Continents:
            </span>
            <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <li>
                    <button
                        type="button"
                        onClick={onClearContinent}
                        aria-pressed={activeContinent === null}
                        className={cn(
                            'inline-flex cursor-pointer items-center rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-fg shadow-2xs transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                            activeContinent === null ? 'bg-fg text-bg' : 'bg-surface'
                        )}
                    >
                        All
                    </button>
                </li>
                {ALL_CONTINENTS.map(continent => {
                    const isActive = activeContinent === continent
                    return (
                        <li key={continent}>
                            <button
                                type="button"
                                onClick={() => onSelectContinent(continent)}
                                aria-pressed={isActive}
                                aria-label={`Filter by ${continent}${isActive ? ', currently active' : ''}`}
                                className={cn(
                                    'inline-flex cursor-pointer items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200 dark:focus-visible:ring-slate-500',
                                    continentTheme[continent].cardBg,
                                    isActive && 'outline outline-2 outline-offset-2 outline-fg'
                                )}
                            >
                                {continent}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}