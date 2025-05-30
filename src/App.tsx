// src/App.tsx
import { useEffect, useState } from 'react'
import './App.css'

// Importar el componente PokemonCard
// import PokemonCard from './components/PokemonCard';

function App() {
  // Estados base
  const [pokemonList, setPokemonList] = useState<Array<{ name: string, url: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const fetchPokemonList = async (pageNum: number) => {
  };


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
          {/* Ejemplo: <PokemonCard id={1} name="bulbasaur" ... /> */}
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