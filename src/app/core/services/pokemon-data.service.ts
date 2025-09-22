import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { PokemonApiService } from './pokemon-api.service';
import { Pokemon, PokemonFilters } from '@core/models';
import { PokedexService } from './pokedex.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private pokemonApi = inject(PokemonApiService);
  private pokedexService = inject(PokedexService);

  private allPokemons = signal<Pokemon[]>([]);
  private currentFilters = signal<PokemonFilters | undefined>(undefined);

  public pokemons = computed(() => {
    const all = this.allPokemons();
    const filters = this.currentFilters();
    const pokedexIds = new Set(this.pokedexService.pokedex().map((p) => p.id));
    
    let filtered = all.filter((p) => !pokedexIds.has(p.id));
    
    if (filters) {
      filtered = this.applyFilters(filtered, filters);
    }
    
    return filtered;
  });

  constructor() {
    this.loadAllPokemons();
  }

  private async loadAllPokemons() {
    try {
      const response = await this.pokemonApi.getAllPokemons();
      this.allPokemons.set(response);
    } catch (error) {
      console.error('Error loading pokemons:', error);
      this.allPokemons.set([]);
    }
  }

  private applyFilters(pokemons: Pokemon[], filters: PokemonFilters): Pokemon[] {
    return pokemons.filter((pokemon) => {
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

  public setFilters(filters: PokemonFilters) {
    this.currentFilters.set(filters);
  }

  public clearFilters() {
    this.currentFilters.set(undefined);
  }

  // Método legacy para compatibilidad
  async getPokemons(filters?: PokemonFilters) {
    if (filters) {
      this.setFilters(filters);
    } else {
      this.clearFilters();
    }
    return this.pokemons();
  }
}
