// src/components/PokemonModal.tsx
import React, { useEffect, useState } from "react"
import "./PokemonModal.css"
import useFetch from "../hooks/useFetch"
import { POKEMON_API } from "../consts"
import { capitalize } from "../utils/capitalize"
import { Pokemon } from "../types"

interface Props {
	name: string
	onClose: () => void
}

const PokemonModal: React.FC<Props> = ({ name, onClose }) => {
	const {
		data: pokemon,
    loading,
    error
	} = useFetch<Pokemon>(`${POKEMON_API.BASE_URL}/${name}`)
	const [type, setType] = useState("")

	useEffect(() => {
		console.log(pokemon)
		if (pokemon) {
			setType(pokemon?.types[0]?.type?.name)
		}
	}, [pokemon])

	if (!name) return null

	return (
		<div
			className="modal-backdrop"
			onClick={onClose}
		>
			<div
				className={`modal-content ${type}`}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="close-button"
					onClick={onClose}
				>
					✕
				</button>
				{loading && <p>Cargando...</p>}
				{error && <p>Error al cargar detalles</p>}
	{pokemon && (
  <>
    <h2>
      {capitalize(pokemon.name)}
    </h2>
    <img
      src={pokemon.sprites.front_default}
      alt={pokemon.name}
    />
    <div>
      <strong>Type:</strong>
      {pokemon.types.map((item) => (
        <span key={item.type.name}> {capitalize(item.type.name)} </span>
      ))}
    </div>


    <div className="pokemon-stats">
    
      <ul>
        {pokemon.stats.map((statItem) => (
          <li key={statItem.stat.name}>
            <strong>{statItem.stat.name}:</strong> {statItem.base_stat}
          </li>
        ))}
      </ul>
    </div>
  </>
)}

			</div>
		</div>
	)
}

export default PokemonModal
