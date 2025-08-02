import { createSlice } from "@reduxjs/toolkit";
import { Pokemon, Type } from "../../global/interface";

const homeSlice = createSlice({
    name: "pokeAPI",
    initialState: {
        pokemon: <Pokemon[]> [],
        typeSelected: <Type>{},
        pokemonOfType: <Pokemon[]>[],
        pokemonSelected: <Pokemon>{}
    },
    reducers: {
        setPokemon: (state, action) => {
            state.pokemon = action.payload
        },
        setTypeSelected: (state, action) => {
            state.typeSelected = action.payload as Type,
            state.pokemonOfType = state.pokemon.filter((p: Pokemon) => p.types.includes(state.typeSelected.name)) as Pokemon[]
        },
        setPokemonSelected: (state, action) => {
            state.pokemonSelected = action.payload as Pokemon
        },

    }
})

export const {setPokemon, setTypeSelected, setPokemonSelected} = homeSlice.actions

export default homeSlice.reducer