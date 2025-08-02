export interface Pokemon {
    id: string,
    name: string,
    types: string[],
    flavorText: string,
    sprites: {
        front_default: string,
        back_default: string,
        front_shiny: string,
        back_shiny: string,
    },
}

export interface Type {
    id: number,
    name: string,
    nombre: string,
    color: string[]
}

export interface PokePreview {
    id: string,
    name: string,
    sprite: string,
    startDate: string,
    endDate?: string
}

export interface FirePreview {
    key: string,
    pokepreview: PokePreview
}