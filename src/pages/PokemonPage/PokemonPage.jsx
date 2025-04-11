import { useState, useEffect } from "react"
import PokemonService from "../../services/PokemonService"
import { Link } from 'react-router-dom'

import styles from './PokemonPage.module.css';

export default function PokemonPage() {
    const [pokemon, setPokemon] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); //error message
    const [count, setCount] = useState(0);

    useEffect(() => {
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
    }, []); //[] means only run this effect once

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

    return (
        <>
            <div>{ errorMessage }</div>
            <h1>Pokémon</h1>
            {count > 0 &&
                < button onClick={getPrevious} >
                    Previous
                </button >
                
            }
            {count < 1300 &&
                <button onClick={getNext}>
                    Next
                </button>
            }
            <ul className={styles.pokemon}>
                {pokemon.map((item, index) => (
                    <li key={index}>
                        <Link to={`/detail/${item.name.toLowerCase()}`}>
                        {item.name}
                        </Link>
                        </li>
                )
                )}
            </ul>
        </>
    )
}