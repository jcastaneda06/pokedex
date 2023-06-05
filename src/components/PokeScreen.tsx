import { LoadingOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import axios from "axios"
import { use, useEffect, useState } from "react"
import { Pokemon } from "~/models/pokemon"
import { DamageRelations, TypeRelations } from "~/models/type";

interface Props {
    pokemon: Pokemon | null | undefined;
    pokemonNameInput: string;
    searching: boolean;
}


const PokeScreen = ({ pokemon, pokemonNameInput, searching }: Props) => {
    const [pokemonName, setPokemonName] = useState('')
    const [weakTo, setWeakTo] = useState<DamageRelations>({
        double_damage_from: [],
        double_damage_to: [],

    })

    let test: number = 1

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

    function getTypeRelations() {
        if (pokemon) {
            pokemon.types.map((type, index) => {
                axios.get(`https://pokeapi.co/api/v2/type/${type.type.name}`).then((response) => {
                    const typeData: TypeRelations = response.data
                    const typeRelations: TypeRelations = { ...typeData }
                    setWeakTo(typeRelations.damage_relations)
                    console.log('Weak to: ', weakTo)
                    console.log('Type relations: ', typeRelations.damage_relations)
                }).catch((error) => {
                    console.error(error)
                })
            })
        }
    }

    useEffect(() => {
        setPokemonName(pokemonNameInput)
    }, [])

    useEffect(() => {
        getTypeRelations()
    }, [pokemon])

    return (
        <div className="flex flex-col">
            <div className="bg-white my-4 p-2 rounded">
                <div className="flex gap-4 bg-green-600 text-green-900 font-bold text-sm p-2 min-h-[110px] rounded">
                    {pokemon && !searching ? (
                        <>
                            <div className="flex-1 flex flex-col">
                                <p>Pokedex: {pokemon.order}</p>
                                <p>Name: {pokemon.name}</p>
                                <p>Height: {pokemon.height / 10}m</p>
                                <p>Weight: {pokemon.weight / 10}kg</p>
                                <div className="flex flex-col mt-auto">
                                    <p>Weak to:</p>
                                    <div className="flex flex-row flex-wrap gap-2">
                                        {types.map((t, index) => (
                                            <>
                                                {weakTo.double_damage_from.find(w => w.name === t)
                                                    ? (<p className={t + ' text-center flex-1'} key={index}>{t}</p>)
                                                    : (<></>)
                                                }
                                            </>
                                        ))}
                                    </div>
                                </div>
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