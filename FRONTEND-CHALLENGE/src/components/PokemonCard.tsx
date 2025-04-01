import React, { useEffect, useState } from "react";
import "./PokemonCard.css";
import { Pokemon } from "../types";

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
  onToggleFavorite,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const handleGetTypes = async () => {
    const result = await fetch(url);
    const data = await result.json();
    setPokemon(data);
  };

  useEffect(() => {
    handleGetTypes();
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(name);
    }
  };

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      {pokemon && (
        <div className="pokemon-card" onClick={() => onSelectPokemon(name)}>
          <div className="pokemon-card-header">
            <span className="pokemon-card-id">#{name}</span>
            {onToggleFavorite && (
              <button
                className={`favorite-button ${isFavorite ? "active" : ""}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? "★" : "☆"}
              </button>
            )}
          </div>

          <div className="pokemon-card-image">
            <img src={pokemon?.sprites.front_default} alt={name} loading="lazy" />
          </div>

          <div className="pokemon-card-content">
            <h3 className="pokemon-card-name">{displayName}</h3>

            <div className="pokemon-card-types">
              {/* {pokemon.map((type) => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
