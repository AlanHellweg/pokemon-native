import { pokeApi } from "../../config/api/pokeApi"
import { Pokemon } from "../../domain/entities/pokemon"
import { PokeAPIPokemon } from "../../infrastructure/interface/pokeapi.interfaces"
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper"
import { getPokemonDescription } from "./get-pokemon-description"

export const getPokemonById = async (id: number): Promise<Pokemon> => {
    try {
        const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`)
        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data)
        return pokemon
    } catch (error) {
        throw new Error('Error al consultar detalles')
    }
}