import React, { useEffect } from 'react';
import './PokemonCard.css';

interface PokemonCardProps {
  name: string;
  url: string;
  isFavorite?: boolean;
  onSelectPokemon: (name: string) => void;
  onToggleFavorite?: (name: string) => void;
}

interface PokemonDetail {
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  url,
  isFavorite = false,
  onSelectPokemon,
  onToggleFavorite
}) => {

  const [pokemonDetail, setPokemonDetail] = React.useState<any>(null);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(name);
    }
  };

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  const fetchPokemonDetails = async() => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const { sprites, types } = data;
      setPokemonDetail({
        imageUrl: sprites?.front_default || sprites?.back_default,
        types 
       });
    } catch(e) {

    }
  }

  useEffect(() => {
    fetchPokemonDetails();
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
        <img src={pokemonDetail?.imageUrl} alt={name} loading="lazy" />
      </div>

      <div className="pokemon-card-content">
        <h3 className="pokemon-card-name">{displayName}</h3>

        <div className="pokemon-card-types">
          {pokemonDetail?.types?.map?.((types, i):  => (
            <span key={i} className={`type-badge ${types?.type?.name}`}>
              {types?.type?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;