import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAuthUrl = process.env.EXPO_PUBLIC_BASE_AUTH_URL
const apiKey = process.env.EXPO_PUBLIC_API_KEY

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({baseUrl:baseAuthUrl }),
    endpoints: (builder)=>({
        signup: builder.mutation({
            query: (auth)=>({
                url: `accounts:signUp?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        }),
        login: builder.mutation({
            query: (auth)=>({
                url: `accounts:signInWithPassword?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        }),
    })
})

export const {useSignupMutation, useLoginMutation} = authAPI