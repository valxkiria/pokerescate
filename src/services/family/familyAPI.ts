
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokePreview } from "../../global/interface";

const baseUrl = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const familyAPI = createApi({
    reducerPath: "familyAPI",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getSponsoring: builder.query({
            query: (localId) => `sponsoring/${localId}.json`,
            transformResponse: (response) => {
                if (!response) {
                    return []
                }
                return Object.entries(response) as [string, PokePreview][]
            }
        }),
        getAbandoned: builder.query({
            query: (localId) => `abandoned/${localId}.json`,
            transformResponse: (response) => {
                if (!response) {
                    return []
                }
                return Object.values(response) as PokePreview[]
            }
        }),
        getGifted: builder.query({
            query: (localId) => `gifted/${localId}.json`,
            transformResponse: (response) => {
                if (!response) {
                    return []
                }
                return Object.values(response) as PokePreview[]
            }
        }),
        postSponsoring: builder.mutation({
            query: (data) => ({
                url: `sponsoring/${data.localId}.json`,
                method: 'POST',
                body: {
                    id: data.pokemon.id,
                    name: data.pokemon.name,
                    sprite: data.pokemon.sprites.front_default,
                    startDate: new Date().toLocaleDateString(),
                }
            })
        }),
        postAbandoned: builder.mutation({
            query: (data) => ({
                url: `Abandoned/${data.localId}.json`,
                method: 'POST',
                body: {
                    ...data.pokepreview,
                    endDate: new Date().toLocaleDateString()
                }
            })
        }),
        postGifted: builder.mutation({
            query: (data) => ({
                url: `gifted/${data.localId}.json`,
                method: 'POST',
                body: {
                    id: data.pokemon.id,
                    name: data.pokemon.name,
                    sprite: data.pokemon.sprites.front_default,
                    startDate: new Date().toLocaleDateString()
                }
            })
        }),
        deleteSponsoring: builder.mutation({
            query: (data) => ({
                url: `sponsoring/${data.localId}/${data.key}.json`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetSponsoringQuery, useGetAbandonedQuery, useGetGiftedQuery, usePostSponsoringMutation, usePostAbandonedMutation, usePostGiftedMutation, useDeleteSponsoringMutation, } = familyAPI
