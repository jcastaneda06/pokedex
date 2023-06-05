import { LoadingOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import axios from "axios"
import { use, useEffect, useState } from "react"
import { Pokemon } from "~/models/pokemon"

interface Props {
    pokemon: Pokemon | null | undefined;
    pokemonNameInput: string;
    searching: boolean;
}


const PokeScreen = ({ pokemon, pokemonNameInput, searching }: Props) => {
    const [pokemonName, setPokemonName] = useState('')

    const types = [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dark",
        "dragon",
        "steel",
        "fairy",
        "unknown",
        "shadow"
    ]

    function handlePokemonNameInput() {
        setPokemonName(pokemonName)
    }

    useEffect(() => {
        setPokemonName(pokemonNameInput)
    }, [])
    
    return (
        <div className="flex flex-col">
            <div className="bg-white my-4 p-2 rounded">
                <div className="flex bg-green-600 text-green-900 font-bold p-2 min-h-[110px] rounded">
                    {pokemon && !searching ? (
                        <>
                            <div className="flex-1">
                                <p>Pokedex: {pokemon.order}</p>
                                <p>Name: {pokemon.name}</p>
                                <p>Height: {pokemon.height / 10}m</p>
                                <p>Weight: {pokemon.weight / 10}kg</p>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <img src={pokemon.sprites.front_default
                                    ? pokemon.sprites.front_default
                                    : pokemon.sprites.front_default_female
                                } alt="" />
                                <div className="flex gap-2">
                                    {pokemon.types.map((type, index) => (
                                        <p className={types.find(t => t === type.type.name) + ' text-sm text-center flex-1'} key={index}>{type.type.name}</p>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>{searching ? (
                            <div className="flex-1 flex justify-center items-center text-2xl">
                                <LoadingOutlined />
                            </div>
                        ) : (
                            <div className="flex-1 flex text-2xl justify-center items-center text-center">
                                404 Not Found!
                            </div>
                        )}</>
                    )}

                </div>
            </div>
        </div>
    )
}

export default PokeScreen