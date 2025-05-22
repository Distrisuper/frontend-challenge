import { useEffect, useState } from 'react';
import './PokemonCard.css';
import { Pokemon } from '../types';

interface PokemonCardProps {
  name: string;
  url: string;
  isFavorite?: boolean;
  onSelectPokemon: (name: string) => void;
  onToggleFavorite?: (name: string) => void;
  key: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const fetchUrl = url

      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setPokemon(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    }
    fetchApi();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;


  // const handleFavoriteClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (onToggleFavorite) {
  //     onToggleFavorite(name);
  //   }
  // };

  // const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="pokemon-card" onClick={() => onSelectPokemon(name)}>
      {/* <div className="pokemon-card-header">
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
      </div> */}

      <div className="pokemon-card-image">
        <img src={pokemon?.sprites.front_default} alt={name} loading="lazy" />
      </div>

      <div className="pokemon-card-content">
        <h3 className="pokemon-card-name">{name}</h3>

        <div className="pokemon-card-types">
          {pokemon?.types.map(type => (
            <span key={type.type.name} className={`type-badge ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;