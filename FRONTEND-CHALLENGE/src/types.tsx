// src/types.ts
export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        }
      }
    };
    types: Array<{
      type: {
        name: string;
      }
    }>;
    abilities: Array<{
      ability: {
        name: string;
      }
      is_hidden: boolean;
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      }
    }>;
  }
  
  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<PokemonListItem>;
  }
  
  export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface PokemonContextType {
    pokemonList: PokemonListItem[];
    loading: boolean;
    error: string | null;
    page: number;
    searchTerm: string;
    favorites: Set<number>;
    showOnlyFavorites: boolean;
    
    fetchPokemonList: (page: number) => Promise<void>;
    setPage: (page: number) => void;
    setSearchTerm: (term: string) => void;
    toggleFavorite: (id: number) => void;
    setShowOnlyFavorites: (show: boolean) => void;
  }