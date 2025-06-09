import { useState, useEffect } from 'react';

import PokemonService from '../../services/PokemonService';
import { useParams } from 'react-router-dom';

export default function PokemonDetail() {
    const [pokemonDet, setPokemonDet] = useState({});
    //params means the name will be passed in the url
    const { pokemonName } = useParams();
    const [sprites, setSprites] = useState({});
    const [types, setTypes] = useState([]);
    const [generation, setGeneration] = useState([]);
    const [ability, setAbility] = useState([]);




    useEffect(() => {
        PokemonService.getPokemonDetail(pokemonName)
            .then((response) => {
                setPokemonDet(response.data);
                setSprites(response.data.sprites);
                setTypes(response.data.types);
                setGeneration(response.data.generation);
                setAbility(response.data.abilities);
            })
    }, []); //call once when loaded


    return (
        <>
            <h2>{pokemonName}</h2>
            <img src={sprites.front_default} alt="Pokemon image" />
            <p>{pokemonDet.height}</p>

            h3
        </>
    )
}