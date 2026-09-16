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

function handleScrollToContinent(continent: Continent) {
    const element = document.querySelector(`[data-continent="${continent}"]`)
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Legend() {
    return (
        <div className="flex flex-wrap items-center gap-2 rounded-full p-1">
            <span className="ml-2 mr-1 text-xs font-semibold uppercase tracking-wider text-muted-fg">
                Continents:
            </span>
            <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {ALL_CONTINENTS.map(continent => (
                    <li key={continent}>
                        <button
                            type="button"
                            onClick={() => handleScrollToContinent(continent)}
                            aria-label={`Scroll to first ${continent} card`}
                            className={`inline-flex cursor-pointer items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200 dark:focus-visible:ring-slate-500 ${continentTheme[continent].cardBg}`}
                        >
                            {continent}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}