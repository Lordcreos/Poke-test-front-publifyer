import { inject, Injectable, signal } from '@angular/core';
import { PokeFiltersApiService } from './poke-filters-api.service';
import { FilterOption } from '@core/models';
import { TranslateService } from '@ngx-translate/core';
import { toTitleCase } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class PokeFiltersDataService {
  private pokeApi = inject(PokeFiltersApiService);
  private translation = inject(TranslateService);

  public types = signal<FilterOption[]>([]);
  public regions = signal<FilterOption[]>([]);
  public generations = signal<FilterOption[]>([]);

  constructor() {
    this.init();
    this.translation.onLangChange.subscribe(() => {
      this.updates();
    });
  }

  private async init() {
    await this.getTypes();
    await this.getRegions();
    await this.getGenerations();
  }

  private updates() {
    this.updateTypes();
    this.updateRegions();
    this.updateGenerations();
  }

  private async getTypes() {
    const types = await this.pokeApi.getTypes();
    this.types.set([
      { label: this.translation.instant('filters.allTypes'), value: null },
      ...types.map((t) => ({ label: this.translation.instant(`pokemonType.${t}`), value: t })),
    ]);
  }

  private async updateTypes() {
    const currentTypes = this.types();
    if (currentTypes.length > 0) {
      const updatedTypes = [
        { label: this.translation.instant('filters.allTypes'), value: null },
        ...currentTypes.slice(1).map((t) => ({
          ...t,
          label: this.translation.instant(`pokemonType.${t.value}`),
        })),
      ];
      this.types.set(updatedTypes);
    }
  }

  private async getRegions() {
    const regions = await this.pokeApi.getRegions();
    this.regions.set([
      { label: this.translation.instant('filters.allRegions'), value: null },
      ...regions.map((r) => ({ label: toTitleCase(r), value: r })),
    ]);
  }

  private async updateRegions() {
    const currentRegions = this.regions();
    if (currentRegions.length > 0) {
      const updatedRegions = [
        { label: this.translation.instant('filters.allRegions'), value: null },
        ...currentRegions.slice(1).map((r) => ({
          ...r,
          label: toTitleCase(r.value ?? ''),
        })),
      ];
      this.regions.set(updatedRegions);
    }
  }

  private async getGenerations() {
    const generations = await this.pokeApi.getGenerations();

    const formatted = generations.map((g) => {
      const roman = g.split('-')[1].toUpperCase();
      return {
        label: roman,
        value: g,
      };
    });

    this.generations.set([
      { label: this.translation.instant('filters.allGenerations'), value: null },
      ...formatted,
    ]);
  }
  private async updateGenerations() {
    const currentGenerations = this.generations();
    if (currentGenerations.length > 0) {
      const updatedGenerations = [
        { label: this.translation.instant('filters.allGenerations'), value: null },
        ...currentGenerations.slice(1).map((g) => ({
          ...g,
          label: g.label,
        })),
      ];
      this.generations.set(updatedGenerations);
    }
  }
}
