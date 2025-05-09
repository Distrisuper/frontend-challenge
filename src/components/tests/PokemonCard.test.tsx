import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import PokemonCard from "../PokemonCard"
import * as useFetchModule from "../../hooks/useFetch"

// Mockeamos el hook `useFetch` para evitar llamadas reales a la API
jest.mock("../../hooks/useFetch")

describe("PokemonCard", () => {
	const defaultProps = {
		name: "Charmander",
		url: "https://pokeapi.co/api/v2/pokemon/Charmander",
		isFavorite: false,
		onSelectPokemon: jest.fn(),
		onToggleFavorite: jest.fn(),
	}

	beforeEach(() => {
		jest.clearAllMocks()

		
		;(useFetchModule.default as jest.Mock).mockReturnValue({
			data: {
				name: "Charmander",
				sprites: { front_default: "Charmander-img" },
				height: 4,
				weight: 60,
				types: [{ type: { name: "fire" } }],
			},
			loading: false,
			error: null,
		})
	})

	it("Debería renderizar el nombre en mayuscula", () => {
		render(<PokemonCard {...defaultProps} />)
		expect(screen.getByText("Charmander")).toBeInTheDocument()
	})

	it("Debería renderizar el botón de agregar a favoritos", () => {
		render(<PokemonCard {...defaultProps} />)
		expect(
			screen.getByRole("button", { name: /add to favorites/i })
		).toBeInTheDocument()
	})

	it("Debería llamar al evento onSelectPokemon cuando se hace click", () => {
		render(<PokemonCard {...defaultProps} />)
		fireEvent.click(screen.getByText("Charmander"))
		expect(defaultProps.onSelectPokemon).toHaveBeenCalledWith("Charmander")
	})

	it("Debería llamar al evento onToggleFavorite cuando se hace click", () => {
		render(<PokemonCard {...defaultProps} />)
		fireEvent.click(screen.getByRole("button"))
		expect(defaultProps.onToggleFavorite).toHaveBeenCalledWith("Charmander")
	})

	it("Debería renderizar la imagen de Charmander", () => {
		render(<PokemonCard {...defaultProps} />)
		expect(screen.getByAltText("Charmander")).toBeInTheDocument()
	})

	it("Debería renderizar el tipo de Charmander (fuego)", () => {
		render(<PokemonCard {...defaultProps} />)
		expect(screen.getByText("fire")).toBeInTheDocument()
	})
})
