import React from 'react';
import './PokemonCard.css';

interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  isFavorite?: boolean;
  onSelectPokemon: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  imageUrl,
  types,
  isFavorite = false,
  onSelectPokemon,
  onToggleFavorite
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="pokemon-card" onClick={() => onSelectPokemon(id)}>
      <div className="pokemon-card-header">
        <span className="pokemon-card-id">#{id}</span>
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
        <img src={imageUrl} alt={name} loading="lazy" />
      </div>
      
      <div className="pokemon-card-content">
        <h3 className="pokemon-card-name">{displayName}</h3>
        
        <div className="pokemon-card-types">
          {types.map(type => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;