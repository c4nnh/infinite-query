import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import {
  Collection,
  PaginationParams,
  Pokemon,
  PokemonParams,
} from "../../models";
import { request } from "../request";
import { InfiniteQueryOptions } from "../type";

type Response = {
  get: Collection<Pokemon, "pokemons">;
};

type QueryKeys = {
  get: ["getPokemons", PokemonParams];
};

type API = {
  get: QueryFunction<Response["get"], QueryKeys["get"]>;
};

const PREFIX = "pokemons";

const pokemon: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, ...pageParam } }),
};

export const useGetPokemonsInifiniteQuery = (
  params: PokemonParams & PaginationParams,
  options: InfiniteQueryOptions<Response["get"], QueryKeys["get"]>
) => useInfiniteQuery(["getPokemons", params], pokemon.get, options);
