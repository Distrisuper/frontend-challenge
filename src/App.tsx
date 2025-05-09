
import "./App.css"
import useFetch from "./hooks/useFetch"
import { POKEMON_API } from "./consts"
import PokemonCard from "./components/PokemonCard"
import PokemonModal from "./components/PokemonModal"
import { usePokemonContext } from "./context/PokemonContext"
import { Pokemon } from "./types"

function App() {
	const {
		page,
		setPage,
		favorites,
		toggleFavorite,
		searchTerm,
		setSearchTerm,
		showOnlyFavorites,
		setShowOnlyFavorites,
		selectedPokemon,
		setSelectedPokemon,
	} = usePokemonContext()
	// Custom Hook para llamar a la API que trae la lista de Pokemones, la idea es usar este custom hook para evitar llamar repetidas veces al fetch en la APP.
interface PokemonListResponse {
  results: Pokemon[];
}

const { data: pokemonApiData, loading } = useFetch<PokemonListResponse>(
  `${POKEMON_API.BASE_URL}?limit=20&offset=${page}`
)
	// Handlers
	const handleSelectPokemon = (name: string) => {
		setSelectedPokemon(name)
	}
	const closeModal = () => setSelectedPokemon(null)

	const filteredList = pokemonApiData?.results.filter((pokemon: Pokemon) =>
		pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const visibleList = showOnlyFavorites
		? filteredList?.filter((pokemon: Pokemon) => favorites.has(pokemon.name))
		: filteredList

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
			{selectedPokemon && (
				<PokemonModal
					name={selectedPokemon}
					onClose={closeModal}
				/>
			)}

			<main className="content">
				<section className="pokemon-grid">
					{loading && <p>Cargando Pokemones...</p>}
					{visibleList?.map((pokemon: Pokemon) => (
						<PokemonCard
							key={pokemon.name}
							name={pokemon.name}
							url={pokemon.url}
							isFavorite={favorites.has(pokemon.name)}
							onToggleFavorite={toggleFavorite}
							onSelectPokemon={handleSelectPokemon}
							
						/>
					))}
				</section>

				<section className="pagination">
					<button
						disabled={page === 1}
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					>
						Anterior
					</button>
					<span>Página {page}</span>
					<button onClick={() => setPage((prev) => prev + 1)}>Siguiente</button>
				</section>
			</main>
		</div>
	)
}

export default App
