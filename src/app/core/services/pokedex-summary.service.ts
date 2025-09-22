import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { PokedexService } from './pokedex.service';
import { PokemonDataService } from './pokemon-data.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexSummaryService {
  private pokedexService = inject(PokedexService);
  private pokemonDataService = inject(PokemonDataService);

  private pokedex = this.pokedexService.pokedex;
  private pokemons = this.pokemonDataService.pokemons;

  private refreshSignal = signal(0);
  private recommendationInterval: number;

  pokemonCount = computed(() => this.pokedex().length);
  pokemonTotalCount = computed(() => this.pokemons().length);
  pokedexProgress = computed(() => {
    const total = this.pokemons().length;
    const captured = this.pokedex().length;
    return captured / total;
  });

  averageLevel = computed(() => {
    if (this.pokedex().length === 0) return 0;
    const totalLevel = this.pokedex().reduce((sum, p) => sum + p.level, 0);
    return totalLevel / this.pokedex().length;
  });

  favoriteType = computed(() => {
    const typeCount: { [type: string]: number } = {};
    this.pokedex().forEach((p) => {
      p.types.forEach((type) => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });
    return Object.entries(typeCount).reduce((a, b) => (a[1] > b[1] ? a : b), ['', 0])[0];
  });

  experienceCount = computed(() => {
    return this.pokedex().reduce((sum, p) => sum + p.experience, 0);
  });

  powerfulPokemon = computed(() => {
    const pokedexList = this.pokedex();
    if (!pokedexList.length) return null;
    return pokedexList.reduce((max, p) => (p.attack > max.attack ? p : max), pokedexList[0]);
  });

  lastCaptured = computed(() => {
    return this.pokedex().reverse();
  });

  recommendedPokemons = computed(() => {
    const pokemonsList = this.pokemons();
    const top100 = [...pokemonsList].sort((a, b) => b.attack - a.attack).slice(0, 100);

    const shuffled = [...top100].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  });

  constructor() {
    this.recommendationInterval = setInterval(() => {
      this.refreshSignal.update((n) => n + 1);
    }, 10 * 60 * 1000);

    this.pokedexService.initializePokedex();

    effect(() => {
      this.refreshSignal();
      this.recommendedPokemons();
    });
  }
}
