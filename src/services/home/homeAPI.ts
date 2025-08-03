import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { Pokemon, Type } from "../../global/interface"

const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const homeAPI = createApi({
    reducerPath: "homeAPI",
    baseQuery: fetchBaseQuery({baseUrl:baseRTDBURL}),
    endpoints: (builder) => ({
        getTypes: builder.query({
            query: ()=>'types.json',
            transformResponse: (response) => {
                return Object.values(response) as Type[]
            }
        }),
        //getPokemonByType: TODO
        getPokemon: builder.query({
            query:()=>'pokemon.json',
            transformResponse: (response) => {
                return Object.values(response) as Pokemon[]
            }
        }),
        getHighlightedPokemon: builder.query({
            query: ()=> 'pokemon.json?orderBy="highlight"&equalTo=true',
            transformResponse: (response) => {
                return Object.values(response) as Pokemon[]
            }
        }) 
    })
})

export const {useGetTypesQuery, useGetPokemonQuery, useGetHighlightedPokemonQuery} = homeAPI