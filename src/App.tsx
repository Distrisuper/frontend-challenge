// src/App.tsx
import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard';
import useFetch from './customHooks/useFetch';

// Importar el componente PokemonCard
// import PokemonCard from './components/PokemonCard';
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
function App() {
  // Estados base
  const { data, error, loading, fetchData } = useFetch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  }

  useEffect(() => {
    fetchData(`${BASE_URL}?limit=20&offset=${page * 20}`, 'GET');
  }, [page, searchTerm])


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
            <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
            />
            Mostrar solo favoritos
          </label>
        </div>
      </header>
      <main className="content">
        {/* TODO: Implementar un grid de tarjetas de Pokémon usando el componente PokemonCard */}
        <div className="pokemon-grid">
          {data?.results?.map((p, i) => <PokemonCard onSelectPokemon={() => {}} {...p} key={p?.name} />)}
          {/* Ejemplo: <PokemonCard id={1} name="bulbasaur" ... /> */}
          {loading && <div className="loading">Cargando...</div>}
          {error && <div className="error">{error}</div>}
        </div>
        {/* TODO: Implementar paginación */}
        <div className="pagination">
          <button onClick={() => {handleChangePage(page - 1)}} disabled={(page === 1) || loading}>
            Anterior
          </button>
          <span>Página {page}</span>
          <button onClick={() => {handleChangePage(page + 1)}} disabled={loading}>
            Siguiente
          </button>
        </div>
      </main>
    </div>
  )
}

export default App