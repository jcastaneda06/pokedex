import { type NextPage } from "next"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Pokemon } from "~/models/pokemon"
import Header from "~/components/Header"
import { LoadingOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { set } from "zod"

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>()
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonId, setPokemonId] = useState(1)
  const [searching, setSearching] = useState(false)

  function handleNameInput() {
    setPokemonName(pokemonName.toLowerCase())
    getPokemon()
  }

  async function handleNext(buttonCode: number) {
    buttonCode == 0 ? setPokemonId(pokemonId - 1) : setPokemonId(pokemonId + 1)
    setPokemonName('')
  }

  async function getPokemon() {
    if (pokemonName) {
      setSearching(true)
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
        const pokemonData: Pokemon = response.data
        const pokemon: Pokemon = { ...pokemonData }
        console.log(pokemon)
        setPokemonId(pokemon.id)
        setPokemon(pokemon)
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
    <div className="h-[100vh] flex justify-center p-4">
      <div className="bg-red-500 p-4 max-w-[425px] min-w-[350px] sm:shadow-lg sm:my-4 rounded">
      <Header></Header>
      <div className="bg-red-500 flex flex-col">
        <input type="text" value={pokemonName} onChange={(event) => setPokemonName(event.target.value)} placeholder="Who's that pokemon?" />
        <div className="bg-white my-4 p-2 rounded">
          <div className="flex gap-4 bg-green-600 text-green-900 font-bold p-2 min-h-[110px] rounded">
            {pokemon && !searching ? (
              <>
                <div className="flex-1">
                  <p>Pokedex: {pokemon.order}</p>
                  <p>Name: {pokemon.name}</p>
                  <p>Height: {pokemon.height / 10}m</p>
                  <p>Weight: {pokemon.weight}kg</p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <img src={pokemon.sprites.front_default} alt="" />
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
        <div className="flex gap-4 mb-4">
          <button className="flex-1 flex items-center justify-center bg-slate-800 text-white" onClick={() => handleNext(0)}>
            <ArrowLeftOutlined />
          </button>
          <button className="flex-1 flex items-center justify-center bg-slate-800" onClick={() => handleNext(1)}>
            <ArrowRightOutlined />
          </button>
        </div>
        <button onClick={handleNameInput}>Search</button>
      </div>
    </div >
    </div>
  );
};

export default Home
