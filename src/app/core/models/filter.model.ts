export interface FilterOption {
  label: string;
  value: string | null;
}

export interface PokemonFilters {
  search?: string;
  type?: string;
  region?: string;
  generation?: string;
}

export interface ActiveFilter {
  key: 'search' | 'type' | 'region' | 'generation';
  label: string;
  value: string | null;
}
