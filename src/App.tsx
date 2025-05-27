// src/App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { PokemonListResponse, PokemonListItem } from "./types";
import PokemonCard from "./components/PokemonCard";
import usePokemonList from "./hooks/usePokemonList";

// Importar el componente PokemonCard
// import PokemonCard from './components/PokemonCard';

function App() {
  // Estados base

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const { pokemonList, isLoading, error } = usePokemonList(page);

  const handleNextPage = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const handlePrevPage = () => {
    setPage((prev) => {
      if (prev == 0) return prev;
      return prev - 1;
    });
  };

  const handleSelectPokemon = () => {};
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
          {isLoading ? (
            <p>Esta cargando...</p>
          ) : (
            <>
              {pokemonList.map((pokemon: PokemonListItem) => {
                return (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                    onSelectPokemon={handleSelectPokemon}
                  />
                );
              })}
            </>
          )}

          {/* Ejemplo: <PokemonCard id={1} name="bulbasaur" ... /> */}
        </div>
        {/* TODO: Implementar paginación */}
        <div className="pagination">
          <button disabled={page === 0} onClick={handlePrevPage}>
            Anterior
          </button>
          <span>Página {page + 1}</span>
          <button onClick={handleNextPage}>Siguiente</button>
        </div>
      </main>
    </div>
  );
}

export default App;
