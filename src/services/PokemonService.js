import axios from "axios";

const http = axios.create({

    baseURL: 'https://pokeapi.co/api/v2/pokemon/'
});

export default {
    getAllPokemon() {
        return http.get();
    },

    getPokemonDetail(name) {
        return http.get(name); //append name to the baseURL
    },

    getMorePokemon(count) {
        return http.get(`?offset=${count}&limit=20`);
    }
}