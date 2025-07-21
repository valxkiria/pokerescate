import { createSlice } from "@reduxjs/toolkit";
import pokemon from "../../data/pokemon.json"
import types from "../../data/types.json"
import { Pokemon, Type } from "../../global/interface";

const homeSlice = createSlice({
    name: "pokeAPI",
    initialState: {
        pokemon: pokemon,
        types: types,
        typeSelected: <Type>{},
        pokemonOfType: <Pokemon[]>[],
        pokemonSelected: <Pokemon>{}
    },
    reducers: {
            setTypeSelected: (state, action) => {
                state.typeSelected = action.payload as Type
            },
            setPokemonSelected: (state, action) => {
                state.pokemonSelected = state.pokemon.find(p => p.id === action.payload) as Pokemon
            },
            filterPokemon: (state) => {
                state.pokemonOfType = state.pokemon.filter(p=> state.typeSelected.name in p.types) as Pokemon[]
            }
    }
})

export const {setTypeSelected, setPokemonSelected, filterPokemon} = homeSlice.actions

export default homeSlice.reducer