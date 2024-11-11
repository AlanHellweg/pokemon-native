import { pokeApi } from "../../config/api/pokeApi";
import { PokemonInfo } from "../../infrastructure/interface/pokeapi.interfaces";

export const getPokemonDescription = async (id: number): Promise<string> => {
    try {
        const { data } = await pokeApi.get<PokemonInfo>(`/characteristic/${id}`);
        const spanishDescription = data.descriptions.find(
            (desc) => desc.language.name === "es"
        );

        return spanishDescription ? spanishDescription.description : 'Sin Descripcion';
    } catch (error: any) {
        if (error.response?.status === 404) {
            return 'Sin Descripcion';
        }

        throw new Error('Error al consultar descripcion');
    }
}
