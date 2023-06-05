export interface Pokemon {
    id: number
    height: number
    name: string
    order: number
    sprites: Sprites
    stats: Stats
    weight: number
    types: Types[]
}

interface Sprites {
    back_default: string
    front_default: string
    back_default_female: string
    front_default_female: string
}

interface Stats {
    base_stat: number
    stat: Stat
}

interface Stat {
    name: string
    url: string
}

interface Types {
    slot: number
    type: Type
}

interface Type {
    name: string
    url: string
}