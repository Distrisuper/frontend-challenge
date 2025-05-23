import React, {useEffect, useState} from 'react';
import './PokemonCard.css';
import { Pokemon } from '../types'

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

  const [pokemon, setPokemon] = useState<Pokemon>()

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(name);
    }
  };

  useEffect((()=>{
    const fetchData = (async ()=>{
      const result  = await fetch(url);
      if(!result.ok) return;
      const data = await result.json();

      console.log(data);

      setPokemon(data);
    
    });
    fetchData();
  }), [])


  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

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
      <img src={pokemon?.sprites.front_default} alt={name} loading="lazy" />
      </div>

      <div className="pokemon-card-content">
        <h3 className="pokemon-card-name">{displayName}</h3>

        <div className="pokemon-card-types">
          {pokemon?.types.map(type => (
            <span key={type.slot} className={`type-badge ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;