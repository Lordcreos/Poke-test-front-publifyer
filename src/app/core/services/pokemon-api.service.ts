import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Pokemon, PokemonFilters } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService extends ApiService {
  private pokemonCache: Pokemon[] | null = null;

  public async getAllPokemons(): Promise<Pokemon[]> {
    if (this.pokemonCache) {
      return this.pokemonCache;
    }

    const response = await fetch('/data/pokemon_data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch pokemons');
    }

    const pokemons: Pokemon[] = await response.json();
    this.pokemonCache = pokemons;
    return pokemons;
  }

  // Método legacy para compatibilidad
  public async getPokemons(filters?: PokemonFilters): Promise<Pokemon[]> {
    const allPokemons = await this.getAllPokemons();

    if (filters) {
      return allPokemons.filter((pokemon) => {
        const matchesSearch = filters.search
          ? pokemon.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            pokemon.types.some(type => type.toLowerCase().includes(filters.search!.toLowerCase())) ||
            pokemon.region?.toLowerCase().includes(filters.search!.toLowerCase())
          : true;

        const matchesType = filters.type
          ? pokemon.types.some((type) => type.toLowerCase() === filters.type!.toLowerCase())
          : true;

        const matchesRegion = filters.region
          ? pokemon.region?.toLowerCase() === filters.region.toLowerCase()
          : true;

        const matchesGeneration = filters.generation
          ? pokemon.generation?.toLowerCase() === filters.generation.toLowerCase()
          : true;

        return matchesSearch && matchesType && matchesRegion && matchesGeneration;
      });
    }

    return allPokemons;
  }
}
