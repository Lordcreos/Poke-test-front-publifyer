import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
  computed,
  input,
} from '@angular/core';
import { PokemonFilters, ActiveFilter, FilterOption } from '@core/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SelectModule } from 'primeng/select';
import { PokeFiltersDataService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';

type FilterKey = 'search' | 'type' | 'region' | 'generation';

@Component({
  selector: 'pokemon-filters',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    ChipModule,
  ],
  templateUrl: './pokemon-filters.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonFiltersComponent {
  private pokeData = inject(PokeFiltersDataService);

  public title = input<string>('filter.title');

  types = this.pokeData.types;
  regions = this.pokeData.regions;
  generations = this.pokeData.generations;

  public filtersApplied = output<PokemonFilters>();

  search = signal('');
  selectedType = signal<FilterOption | null>(null);
  selectedRegion = signal<FilterOption | null>(null);
  selectedGeneration = signal<FilterOption | null>(null);

  activeFilters = computed<ActiveFilter[]>(() => {
    const filters: ActiveFilter[] = [];
    if (this.search()) {
      filters.push({ key: 'search', label: this.search(), value: this.search() });
    }
    if (this.selectedType()) {
      filters.push({
        key: 'type',
        label: this.selectedType()!.label,
        value: this.selectedType()!.value,
      });
    }
    if (this.selectedRegion()) {
      filters.push({
        key: 'region',
        label: this.selectedRegion()!.label,
        value: this.selectedRegion()!.value,
      });
    }
    if (this.selectedGeneration()) {
      filters.push({
        key: 'generation',
        label: this.selectedGeneration()!.label,
        value: this.selectedGeneration()!.value,
      });
    }
    return filters;
  });

  applyFilters() {
    const filters: PokemonFilters = {
      search: this.search(),
      type: this.selectedType()?.value || undefined,
      region: this.selectedRegion()?.value || undefined,
      generation: this.selectedGeneration()?.value || undefined,
    };
    this.filtersApplied.emit(filters);
  }

  clearFilters() {
    this.search.set('');
    this.selectedType.set(null);
    this.selectedRegion.set(null);
    this.selectedGeneration.set(null);

    this.applyFilters();
  }

  removeFilter(key: FilterKey) {
    switch (key) {
      case 'search':
        this.search.set('');
        break;
      case 'type':
        this.selectedType.set(null);
        break;
      case 'region':
        this.selectedRegion.set(null);
        break;
      case 'generation':
        this.selectedGeneration.set(null);
        break;
    }

    this.applyFilters();
  }
}
