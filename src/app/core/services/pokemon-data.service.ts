import { inject, Injectable, signal } from '@angular/core';
import { PokemonApiService } from './pokemon-api.service';
import { Pokemon, PokemonFilters } from '@core/models';
import { PokedexService } from './pokedex.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private pokemonApi = inject(PokemonApiService);
  private pokedexService = inject(PokedexService);

  public pokemons = signal<Pokemon[]>([]);

  constructor() {
    this.getPokemons();
  }

  async getPokemons(filters?: PokemonFilters) {
    const response = await this.pokemonApi.getPokemons(filters);

    const pokedexIds = new Set(this.pokedexService.pokedex().map((p) => p.id));
    const filtered = response.filter((p) => !pokedexIds.has(p.id));

    this.pokemons.set(filtered);
    return filtered;
  }
}
