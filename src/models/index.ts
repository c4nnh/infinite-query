export type Collection<T, Name extends string> = {
  [key in Name]: T[];
} & {
  totalPage: number;
  total: number;
};

export type PaginationParams = {
  limit?: number;
  offset?: number;
};

export type Pokemon = {
  id: number;
  name: string;
};

export type PokemonParams = {
  name?: string;
};
