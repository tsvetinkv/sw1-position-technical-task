import type { Country } from '@/types'

export type SortKey = 'name' | 'population' | 'totalArea'
export type SortDirection = 'asc' | 'desc'

interface FilterSortOptions {
    searchQuery: string
    activeContinent: string | null
    sortKey: SortKey
    sortDirection: SortDirection
}

export function filterAndSortCountries(
    countries: Country[],
    { searchQuery, activeContinent, sortKey, sortDirection }: FilterSortOptions
): Country[] {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filtered = countries.filter(country => {
        const matchesSearch =
            normalizedQuery.length === 0 || country.name.toLowerCase().includes(normalizedQuery)
        const matchesContinent = activeContinent === null || country.continent === activeContinent
        return matchesSearch && matchesContinent
    })

    // .sort() mutates in place, so operate on a copy.
    return [...filtered].sort((a, b) => {
        const comparison = sortKey === 'name' ? a.name.localeCompare(b.name) : a[sortKey] - b[sortKey]
        return sortDirection === 'asc' ? comparison : -comparison
    })
}