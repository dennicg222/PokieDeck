import axios from "axios";

const http = axios.create({

    baseURL: 'https://pokeapi.co/api/v2'
});

export default {
    getAllPokemon() {
        return http.get(`/pokemon/`);
    },

    getPokemonDetail(name) {
        return http.get(`/pokemon/${name}`); //append name to the baseURL
    },

    getMorePokemon(count) {
        return http.get(`/pokemon/?offset=${count}&limit=20`);
    },

    getPokemonGeneration(generation) {
        return http.get(`/generation/${generation.id}/`);
    },

    getPokemonType(type) {
        return http.get(`?type=${type}`);
    },

    getPokemonAbility(ability) {
        return http.get(`?ability=${ability}`);
    }

}