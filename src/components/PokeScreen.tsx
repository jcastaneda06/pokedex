import { LoadingOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Pokemon } from "~/models/pokemon"

interface Props {
    pokemon: Pokemon | null | undefined;
    pokemonName: string;
    searching: boolean;
}


const PokeScreen = ({ pokemon, pokemonName, searching }: Props) => {

    return (
        <div className="flex flex-col">
            <input type="text" value={pokemonName} placeholder="Who's that pokemon?" />
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
                            <div className="flex-1 flex justify-center items-center">
                                <img src={pokemon.sprites.front_default
                                    ? pokemon.sprites.front_default
                                    : pokemon.sprites.front_default_female
                                } alt="" />
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