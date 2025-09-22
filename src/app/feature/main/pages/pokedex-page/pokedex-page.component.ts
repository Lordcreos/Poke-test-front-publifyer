import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonFiltersComponent } from '@shared/components/pokemon-filters/pokemon-filters.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PokemonSearchTableComponent } from '@feature/main/components/pokemon-search-table/pokemon-search-table.component';
import { Pokemon, PokemonFilters } from '@core/models';
import { PokedexService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '@feature/main/components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokedex-page',
  imports: [
    CommonModule,
    TranslateModule,
    PokemonFiltersComponent,
    DialogModule,
    ButtonModule,
    PokemonSearchTableComponent,
    PokemonCardComponent,
  ],
  templateUrl: './pokedex-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokedexPageComponent implements OnInit {
  private pokedexService = inject(PokedexService);

  pokedex = this.pokedexService.pokedex;

  display = signal<boolean>(false);
  filters = signal<PokemonFilters>({});

  selectedFromChild = signal<Pokemon[]>([]);

  filteredPokemons = computed(() => {
    let result = this.pokedex();

    const f = this.filters();

    if (f.search) {
      const searchLower = f.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(searchLower));
    }

    if (f.type) {
      result = result.filter((p) => p.types.some((t) => t === f.type));
    }

    if (f.region) {
      result = result.filter((p) => p.region === f.region);
    }

    if (f.generation) {
      result = result.filter((p) => p.generation === f.generation);
    }

    return result;
  });

  ngOnInit() {
    this.pokedexService.initializePokedex();
  }

  onSelectedChange(selected: Pokemon[]) {
    this.selectedFromChild.set(selected);
  }

  showTable() {
    this.display.set(true);
  }

  onAdd() {
    this.pokedexService.addPokemonToPokedex(this.selectedFromChild());
    this.display.set(false);
    this.selectedFromChild.set([]);
  }

  onCancel() {
    this.display.set(false);
  }

  onFiltersApplied(filters: PokemonFilters) {
    this.filters.set(filters);
  }
}
