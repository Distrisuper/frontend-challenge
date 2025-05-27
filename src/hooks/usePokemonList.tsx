import { useEffect, useState } from "react";
import { PokemonListItem, PokemonListResponse } from "../types";

const ELEMENTS_PER_PAGE = 20;

export default function usePokemonList(page: number) {
  const [pokemonList, setPokemonList] = useState<Array<PokemonListItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonList = async (pageNum: number) => {
    // https://pokeapi.co/api/v2/pokemon?limit=20&offset=0

    const offset = pageNum * ELEMENTS_PER_PAGE;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${ELEMENTS_PER_PAGE}&offset=${offset}`
    );
    if (!res.ok) setError(res.statusText);
    const response: PokemonListResponse = await res.json();
    setPokemonList(response.results);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonList(page);
    setIsLoading(false);
  }, [page]);

  return {
    pokemonList,
    isLoading,
    error,
  };
}
