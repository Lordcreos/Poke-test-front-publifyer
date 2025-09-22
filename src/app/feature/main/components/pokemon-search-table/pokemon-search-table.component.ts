import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Pokemon, PokemonFilters, Type } from '@core/models';
import { PokedexService, PokemonDataService } from '@core/services';
import { PokemonFiltersComponent } from '@shared/components/pokemon-filters/pokemon-filters.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { getTypeColor, lighten } from '@shared/utils';
import { PokemonTypesComponent } from '@feature/main/components/pokemon-types/pokemon-types.component';

@Component({
  selector: 'pokemon-search-table',
  imports: [
    CommonModule,
    PokemonFiltersComponent,
    TableModule,
    ButtonModule,
    TranslateModule,
    PokemonTypesComponent,
  ],
  templateUrl: './pokemon-search-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSearchTableComponent {
  private pokemonData = inject(PokemonDataService);
  private pokedexService = inject(PokedexService);

  usePokedex = input<boolean>(false);

  pokemons = computed(() =>
    this.usePokedex() ? this.pokedexService.pokedex() : this.pokemonData.pokemons()
  );

  constructor() {
    effect(() => {
      if (this.usePokedex()) {
        this.pokedexService.initializePokedex();
      }
    });
  }

  selectedPokemons = signal<Pokemon[]>([]);

  selectedChange = output<Pokemon[]>();

  togglePokemon(pokemon: Pokemon) {
    console.log('Toggling Pokemon:', pokemon);
    this.selectedPokemons.update((prev) => {
      const exists = prev.find((p) => p.id === pokemon.id);
      let updated: Pokemon[];
      if (exists) {
        updated = prev.filter((p) => p.id !== pokemon.id);
      } else {
        updated = [...prev, pokemon];
      }
      this.selectedChange.emit(updated);
      return updated;
    });
  }

  onSelectionChange(selected: Pokemon[]) {
    this.selectedPokemons.set(selected);
    this.selectedChange.emit(selected);
  }

  searchPokemon(filters: PokemonFilters) {
    this.pokemonData.getPokemons(filters);
  }

  lighten(hex: string, percent: number) {
    return lighten(hex, percent);
  }

  getTypeColor(type: Type) {
    return getTypeColor(type);
  }
}
