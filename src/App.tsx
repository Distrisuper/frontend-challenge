// src/App.tsx
import { useEffect, useState } from 'react'
import './App.css'
import { IApiResponse, IResultApiResponse, Pokemon } from './types';

// Importar el componente PokemonCard
import PokemonCard from './components/PokemonCard';

function App() {
  // Estados base
  //const [favorites, setFavorites] = useState<Set<number>>(new Set());
  //const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pokemonList, setPokemonList] = useState<IResultApiResponse[]>([]);

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonList = async (pageNum: number, limit: number) => {
    try {
      const offset = page > 1 ? pageNum * limit : 0;

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      if (response.status !== 200) throw new Error("Error recuperando pokemones");
      const { results }: IApiResponse = await response.json();

      if (results.length === 0) throw new Error("No hay pokemones disponibles");

      return results;
    }
    catch (error: any) {
      setError(error ?? 'Internal server error');
    }
  };


  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetchPokemonList(1, 20);
      if (res) setPokemonList(res);
    }
    fetchPokemons();
  }, [])

  return (
    <div className="pokemon-app">
      <header className="app-header">
        <h1>Pokédex Challenge</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <label className="favorites-filter">
            {/* <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
            /> */}
            Mostrar solo favoritos
          </label>
        </div>
      </header>

      <main className="content">
        {/* TODO: Implementar un grid de tarjetas de Pokémon usando el componente PokemonCard */}
        <div className="pokemon-grid">
          {
            pokemonList && pokemonList.length > 0 && pokemonList.map((poke: IResultApiResponse) => {
              return (
               <div className=''>
                 <PokemonCard
                  key={poke.url}
                  name={poke.name}
                  url={poke.url}
                  onSelectPokemon={(name: string) => console.log(name)}
                  onToggleFavorite={(value: string) => console.log(value)}
                />
               </div>
              )
            })
          }
        </div>
        {/* TODO: Implementar paginación */}
        <div className="pagination">
          <button disabled={page === 1}>
            Anterior
          </button>
          <span>Página {page}</span>
          <button>
            Siguiente
          </button>
        </div>
      </main>
    </div>
  )
}

export default App