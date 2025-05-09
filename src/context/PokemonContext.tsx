import { createContext, useContext, useState, ReactNode } from "react"


interface PokemonContextProps {

	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	favorites: Set<string>
	toggleFavorite: (name: string) => void
	searchTerm: string
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
	showOnlyFavorites: boolean
	setShowOnlyFavorites: React.Dispatch<React.SetStateAction<boolean>>
	selectedPokemon: string | null
	setSelectedPokemon: React.Dispatch<React.SetStateAction<string | null>>
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined)

export const usePokemonContext = () => {
	const context = useContext(PokemonContext)
	if (!context)
		throw new Error(
			"usePokemonContext debe utilizarse dentro de un PokemonProvider"
		)
	return context
}

export const PokemonProvider = ({ children }: { children: ReactNode }) => {

	const [page, setPage] = useState<number>(1)
	// Estados de búqueda
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [favorites, setFavorites] = useState<Set<string>>(new Set())
	const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
	const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)

	const toggleFavorite = (name: string) => {
		setFavorites((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(name)) newSet.delete(name)
			else newSet.add(name)
			return newSet
		})
	}

	return (
		<PokemonContext.Provider
			value={{
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
			}}
		>
			{children}
		</PokemonContext.Provider>
	)
}
