import type { Continent } from '@/types'

export interface ContinentTheme {
    cardBg: string
    bodyText: string
    labelText: string
}

export const continentTheme: Record<Continent, ContinentTheme> = {
    Africa: {
        cardBg: 'bg-yellow-200 dark:bg-yellow-900',
        bodyText: 'text-slate-800 dark:text-slate-200',
        labelText: 'text-slate-800 dark:text-slate-300',
    },
    Asia: {
        cardBg: 'bg-red-200 dark:bg-red-900',
        bodyText: 'text-slate-800 dark:text-slate-200',
        labelText: 'text-slate-800 dark:text-slate-300',
    },
    Europe: {
        cardBg: 'bg-blue-200 dark:bg-blue-900',
        bodyText: 'text-slate-800 dark:text-slate-200',
        labelText: 'text-slate-800 dark:text-slate-300',
    },
    'North America': {
        cardBg: 'bg-purple-200 dark:bg-purple-900',
        bodyText: 'text-slate-800 dark:text-slate-200',
        labelText: 'text-slate-800 dark:text-slate-300',
    },
    'South America': {
        cardBg: 'bg-green-200 dark:bg-green-900',
        bodyText: 'text-slate-800 dark:text-slate-200',
        labelText: 'text-slate-800 dark:text-slate-300',
    },
    Oceania: {
        cardBg: 'bg-cyan-200 dark:bg-cyan-900',
        bodyText: 'text-slate-800 dark:text-slate-200',
        labelText: 'text-slate-800 dark:text-slate-300',
    },
}