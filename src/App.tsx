// src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";

// Importar el componente PokemonCard
// import PokemonCard from './components/PokemonCard';

function App() {
  // Estados base
  const [pokemonList, setPokemonList] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [favorites, setFavorites] = useState<Set<number>>(new Set());
  // const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const fetchPokemonList = async (pageNum: number) => {
    try {
      setLoading(true);
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`
      );
      const data = await result.json();

      setPokemonList(data.results);
    } catch (error) {
      console.log(error);
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(1);
  }, [page]);

  if (loading) {
    return <h1>cargando...</h1>;
  }

  return (
    <div className="pokemon-app">
      <header className="app-header">
        <h1>Pokédex Challenge</h1>
        <div className="search-container">
          {/* <input
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
          </label>*/}
        </div>
      </header>

      <main className="content">
        {/* TODO: Implementar un grid de tarjetas de Pokémon usando el componente PokemonCard */}
        <div className="pokemon-grid">
          {/* Ejemplo: <PokemonCard id={1} name="bulbasaur" ... /> */}
          {pokemonList &&
            pokemonList.map((pokemon, index) => {
              return (
                <PokemonCard
                  name={pokemon.name}
                  url={pokemon.url}
                  onSelectPokemon={() => {}}
                />
              );
            })}
        </div>
        {/* TODO: Implementar paginación */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 20)}
          >
            Anterior
          </button>
          <span>Página {page / 20}</span>
          <button onClick={() => setPage((prev) => prev + 20)}>
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
