import { createSlice } from "@reduxjs/toolkit";
import { FirePreview, PokePreview } from "../../global/interface";

const familySlice = createSlice({
    name: "familyAPI",
    initialState: {
        sponsoring: <FirePreview[]> [],
        gifted: <PokePreview[]> [],
        abandoned: <PokePreview[]> [],
    },
    reducers: {
            setSponsoring: (state, action) => {
                const entries = action.payload as [string, PokePreview][] | undefined
                state.sponsoring = entries? entries.map(([key, pokepreview]: [string, PokePreview]) => ({key, pokepreview}) ) as FirePreview[] : []
            },
            setGifted: (state, action) => { 
                state.gifted = action.payload as PokePreview[]
            },
            setAbandoned: (state, action) => {
                state.abandoned = action.payload as PokePreview[]
            }
    }
})

export const {setSponsoring, setAbandoned, setGifted} = familySlice.actions

export default familySlice.reducer
