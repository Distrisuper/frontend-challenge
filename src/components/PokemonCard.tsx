import React, { useEffect, useState } from 'react';
import './PokemonCard.css';
import { Pokemon } from '../types';

interface PokemonCardProps {
  name: string;
  url: string;
  isFavorite?: boolean;
  onSelectPokemon: (name: string) => void;
  onToggleFavorite?: (name: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  url,
  isFavorite = false,
  onSelectPokemon,
  onToggleFavorite
}) => {

  const [pokemonData, setPokemonData] = useState<Pokemon>()

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(name);
    }
  };

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  const fetchPokemonData = async (url: string) => {

    const response = await fetch(url);
    if (response.status !== 200) return;
    const res = await response.json()

    console.log(res);

    setPokemonData(res)
  }

  useEffect(() => {
    fetchPokemonData(url);
  }, [])

  return (
    <div className="pokemon-card" onClick={() => onSelectPokemon(name)}>
      <div className="pokemon-card-header">
        <span className="pokemon-card-id">#{name}</span>
        {onToggleFavorite && (
          <button
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>

      <div className="pokemon-card-image">
        <img src={pokemonData?.sprites.front_default ?? ''} alt={name} loading="lazy" />
      </div>

      <div className="pokemon-card-content">
        <h3 className="pokemon-card-name">{displayName}</h3>

        <div className="pokemon-card-types">
          {pokemonData && pokemonData.types && pokemonData.types.map(type => (
            <span key={type.type.name} className={`type-badge ${type}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;