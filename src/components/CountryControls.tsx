import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import type { SortDirection, SortKey } from '@/lib/filterSortCountries'

interface CountryControlsProps {
    searchQuery: string
    onSearchQueryChange: (value: string) => void
    sortKey: SortKey
    sortDirection: SortDirection
    onSortKeyChange: (value: SortKey) => void
    onSortDirectionChange: (value: SortDirection) => void
}

type SortOptionValue = `${SortKey}-${SortDirection}`

const SORT_OPTIONS: { value: SortOptionValue; sortKey: SortKey; sortDirection: SortDirection; label: string }[] = [
    { value: 'name-asc', sortKey: 'name', sortDirection: 'asc', label: 'Name (A–Z)' },
    { value: 'name-desc', sortKey: 'name', sortDirection: 'desc', label: 'Name (Z–A)' },
    { value: 'population-asc', sortKey: 'population', sortDirection: 'asc', label: 'Population (low to high)' },
    { value: 'population-desc', sortKey: 'population', sortDirection: 'desc', label: 'Population (high to low)' },
    { value: 'totalArea-asc', sortKey: 'totalArea', sortDirection: 'asc', label: 'Area (low to high)' },
    { value: 'totalArea-desc', sortKey: 'totalArea', sortDirection: 'desc', label: 'Area (high to low)' },
]

export function CountryControls({
                                    searchQuery,
                                    onSearchQueryChange,
                                    sortKey,
                                    sortDirection,
                                    onSortKeyChange,
                                    onSortDirectionChange,
                                }: CountryControlsProps) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    const selectedValue: SortOptionValue = `${sortKey}-${sortDirection}`
    const selectedOption = SORT_OPTIONS.find(option => option.value === selectedValue) ?? SORT_OPTIONS[0]

    useEffect(() => {
        function onClickOutside(event: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    function choose(value: SortOptionValue) {
        const option = SORT_OPTIONS.find(candidate => candidate.value === value)
        if (!option) return
        onSortKeyChange(option.sortKey)
        onSortDirectionChange(option.sortDirection)
        setOpen(false)
    }

    function onButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(true)
        } else if (event.key === 'Escape') {
            setOpen(false)
        }
    }

    function onOptionKeyDown(event: KeyboardEvent<HTMLLIElement>, value: SortOptionValue, index: number) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            choose(value)
        } else if (event.key === 'Escape') {
            event.preventDefault()
            setOpen(false)
        } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            const next = document.getElementById(`country-sort-option-${Math.min(index + 1, SORT_OPTIONS.length - 1)}`)
            next?.focus()
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            const prev = document.getElementById(`country-sort-option-${Math.max(index - 1, 0)}`)
            prev?.focus()
        }
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            {/* Search Input */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="country-search" className="text-xs font-semibold uppercase tracking-wide text-muted-fg">
                    Search countries
                </label>
                <div className="relative">
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        id="country-search"
                        type="search"
                        value={searchQuery}
                        onChange={event => onSearchQueryChange(event.target.value)}
                        placeholder="e.g. Italy"
                        className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-left text-sm text-fg placeholder:text-muted-fg outline-none sm:w-64"
                    />
                </div>
            </div>

            {/* Sort Listbox */}
            <div ref={rootRef} className="relative flex flex-col gap-1.5">
                <label id="country-sort-label" htmlFor="country-sort" className="text-xs font-semibold uppercase tracking-wide text-muted-fg">
                    Sort by
                </label>
                <button
                    id="country-sort"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-labelledby="country-sort-label"
                    onClick={() => setOpen(o => !o)}
                    onKeyDown={onButtonKeyDown}
                    className="relative w-full rounded-full border border-border bg-surface py-2 pl-3.5 pr-9 text-left text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:w-64"
                >
                    {selectedOption.label}
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={cn('pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg transition-transform', open && 'rotate-180')}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                {open && (
                    <ul
                        role="listbox"
                        aria-labelledby="country-sort-label"
                        tabIndex={-1}
                        className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-2xl border border-border bg-surface py-1 text-sm shadow-lg"
                    >
                        {SORT_OPTIONS.map((option, index) => (
                            <li
                                key={option.value}
                                id={`country-sort-option-${index}`}
                                role="option"
                                tabIndex={0}
                                aria-selected={option.value === selectedValue}
                                onClick={() => choose(option.value)}
                                onKeyDown={event => onOptionKeyDown(event, option.value, index)}
                                className={cn(
                                    'cursor-pointer px-3.5 py-2 text-fg outline-none hover:bg-border focus-visible:bg-border',
                                    option.value === selectedValue && 'bg-border font-medium'
                                )}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}