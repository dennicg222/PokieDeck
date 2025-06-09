import { useState, useEffect } from "react"
import PokemonService from "../../services/PokemonService"
import { Link } from 'react-router-dom'

import styles from './PokemonPage.module.css';

export default function PokemonPage() {
    const [pokemon, setPokemon] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); //error message
    const [count, setCount] = useState(0);
    const [generation, setGeneration] = useState(1);
    const [type, setType] = useState('');
    const [ability, setAbility] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const generations = [
        { id: 1, name: "Kanto" },
        { id: 2, name: "Johto" },
        { id: 3, name: "Hoenn" },
        { id: 4, name: "Sinnoh" },
        { id: 5, name: "Unova" },
        { id: 6, name: "Kalos" },
        { id: 7, name: "Alola" },
        { id: 8, name: "Galar and Hisui" },
        { id: 9, name: "Paldea" }
    ];

    useEffect(() => {
        setIsLoading(true);
        PokemonService.getAllPokemon() // <- async api call
            .then((response) => { // we get back a promise (response)
                //console.log(response);
                setPokemon(response.data.results);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(`Received an Error Message from the server: ${error.response.status}`);
                } else if (error.request) {
                    setErrorMessage('No response from the server')
                } else {
                    setErrorMessage('An error occurred while creating request');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); //[] means only run this effect once


    useEffect(() => {
        PokemonService.getPokemonGeneration(generation)
            .then((response) => {
                setPokemon(response.data.results);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(`Received an Error Message from the server: ${error.response.status}`);
                } else if (error.request) {
                    setErrorMessage('No response from the server')
                } else {
                    setErrorMessage('An error occurred while creating request');
                }
            })
    }, [generation]);

    useEffect(() => {
        PokemonService.getPokemonType(type)
            .then((response) => {
                setPokemon(response.data.results);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(`Received an Error Message from the server: ${error.response.status}`);
                } else if (error.request) {
                    setErrorMessage('No response from the server')
                } else {
                    setErrorMessage('An error occurred while creating request');
                }
            })
    }
    , [type]);

    function getNext() {
        setCount(count + 20);
        PokemonService.getMorePokemon(count + 20)
            .then((response) => {
                setPokemon(response.data.results);
        })
    }

    function getPrevious() {
        setCount(count - 20);
        PokemonService.getMorePokemon(count - 20)
        .then((response) => {
            setPokemon(response.data.results);
    })
    }

    function getPokemonGeneration(genId) {
        setGeneration(genId);
    }


    return (
        <div className={styles.pokedexContainer}>
            <div className={styles.pokedexScreen}>
                <div className={styles.pokedexDot}></div>
                <div>{styles.generationsButtons}
                {generations.map((gen) => (
                        <button
                            key={gen.id}
                            className={styles.genButton}
                            onClick={() => getPokemonGeneration(gen.id)}
                        >
                            {gen.name}
                        </button>
                    ))}
                </div>

                <h1>Pokédex</h1>
                <div className={styles.navigationButtons}>
                    {count > 0 && (
                        <button className={styles.button} onClick={getPrevious}>
                            Previous
                        </button>
                    )}
                    {count < 1300 && (
                        <button className={styles.button} onClick={getNext}>
                            Next
                        </button>
                    )}
                </div>
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                <div className={styles.pokemonList}>
                    <ul className={styles.pokemon}>
                        {pokemon?.map((item, index) => (
                            <li key={index}>
                                <Link to={`/detail/${item?.name?.toLowerCase()}`}>
                                    <h3>{item?.name}</h3>
                                    {item?.sprites && (
                                        <img 
                                            src={item?.sprites?.front_default} 
                                            alt={item?.name}
                                        />
                                    )}
                                    <div>
                                        <p>Types: {item?.types?.map(t => t.type.name).join(', ')}</p>
                                        <p>Abilities: {item?.abilities?.map(a => a.ability.name).join(', ')}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

}