export type Continent =
    | 'Africa'
    | 'Asia'
    | 'Europe'
    | 'North America'
    | 'South America'
    | 'Oceania'

export interface Country {
    name: string
    shortInfo: string
    image: string
    continent: Continent
    capital: string
    language: string
    population: number
    totalArea: number
}