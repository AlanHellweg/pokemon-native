import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from '../domain/entities/pokemon'

const initialState: Pokemon[] = []

export const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        addPokemons: (state, action: PayloadAction<Pokemon[]>) => {
            state.push(...action.payload)
        },
    },
})

export const { addPokemons } = pokemonsSlice.actions

export const pokemonsReducer = pokemonsSlice.reducer
