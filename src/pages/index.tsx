import { type NextPage } from "next"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Pokemon } from "~/models/pokemon"
import Header from "~/components/Header"
import { LoadingOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import PokeScreen from "~/components/PokeScreen"

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>()
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonId, setPokemonId] = useState(1)
  const [searching, setSearching] = useState(false)

  function handleNameInput() {
    setPokemonName(pokemonName)
    getPokemonByName()
  }

  function handleNext(buttonCode: number) {
    let newNegativeId = pokemonId - 1 == 0 ? 1 : pokemonId - 1  // 0 is not a valid id
    buttonCode == 0 ? setPokemonId(newNegativeId) : setPokemonId(pokemonId + 1)
    setPokemonName('')
  }

  async function getPokemonByName() {
    if (pokemonName) {
      setSearching(true)
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then((response) => {
        const pokemonData: Pokemon = response.data
        const pokemon: Pokemon = { ...pokemonData }
        console.log(pokemon)
        setPokemonId(pokemon.id)
        setPokemon(pokemon)
        return response.data
      }).catch((error) => {
        console.error(error)
        setPokemon(null)
      });
    }
    setSearching(false)
  }

  async function getPokemonById() {
    if (pokemonId) {
      setSearching(true)
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((response) => {
        const pokemonData: Pokemon = response.data
        const pokemon: Pokemon = { ...pokemonData }
        console.log(pokemon)
        setPokemon(pokemon)
        setPokemonName(pokemon.name)
        return response.data
      }).catch((error) => {
        console.error(error)
        setPokemon(null)
      })
    }
    setSearching(false)
  }

  useEffect(() => {
    getPokemonById()
  }, [pokemonId])

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center p-0 sm:p-4 sm:m-0 bg-gradient-to-b from-sky-300 to bg-indigo-300">
      <div className="flex h-full jusfity-center">
        <div className="flex flex-col bg-red-500 p-4 sm:shadow-lg sm:my-4 sm:rounded">
          <Header></Header>
          <input type="text" onChange={(event) => setPokemonName(event?.target.value)} placeholder="Who's that pokemon?" />
          <PokeScreen pokemon={pokemon} pokemonNameInput={pokemonName} searching={searching} />
          <div className="flex gap-4 mb-4">
            <button className="flex-1 flex items-center justify-center bg-slate-800 active:bg-slate-700 transition-all" onClick={() => handleNext(0)}>
              <ArrowLeftOutlined />
            </button>
            <button className="flex-1 flex items-center justify-center bg-slate-800 active:bg-slate-700 transition-all" onClick={() => handleNext(1)}>
              <ArrowRightOutlined />
            </button>
          </div>
          <button onClick={handleNameInput}>Search</button>
        </div >
      </div>
    </div>
  );
};

export default Home
