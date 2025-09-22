import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Pokemon, PokemonFilters, Team, Type } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PokemonSearchTableComponent } from '../pokemon-search-table/pokemon-search-table.component';
import { TeamDataService } from '@core/services';
import { CommonModule } from '@angular/common';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'team-summary',
  imports: [
    CommonModule,
    TranslateModule,
    DialogModule,
    PokemonSearchTableComponent,
    ButtonModule,
    PokemonTypesComponent,
    RouterLink,
  ],
  templateUrl: './team-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSummaryComponent {
  private teamDataService = inject(TeamDataService);

  public team = input<Team>();

  display = signal<boolean>(false);
  filters = signal<PokemonFilters>({});

  selectedFromChild = signal<Pokemon[]>([]);

  totalPokemons = computed(() => this.team()?.pokemons?.length || 0);

  totalPower = computed(() =>
    (this.team()?.pokemons?.length ?? 0) > 0
      ? this.team()?.pokemons?.reduce((acc, pokemon) => acc + (pokemon.attack || 0), 0) ?? 0
      : 0
  );

  freeSlots = computed(() => (this.team()?.maxMembers ?? 0) - this.totalPokemons());

  slotsArray = computed(() => Array.from({ length: this.freeSlots() }, (_, i) => i));

  typesSummary = computed(() => {
    const typesSet = new Set<Type>();

    this.team()?.pokemons?.forEach((pokemon) => {
      pokemon.types?.forEach((type: string) => {
        if (Object.values(Type).includes(type as Type)) {
          typesSet.add(type as Type);
        }
      });
    });

    return Array.from(typesSet);
  });

  totalStats = computed(() => {
    const pokemons = this.team()?.pokemons ?? [];

    return pokemons.reduce(
      (acc, p) => ({
        hp: acc.hp + p.hp,
        attack: acc.attack + p.attack,
        defense: acc.defense + p.defense,
        special_attack: acc.special_attack + p.special_attack,
        speed: acc.speed + p.speed,
      }),
      {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        speed: 0,
      }
    );
  });

  onSelectedChange(selected: Pokemon[]) {
    this.selectedFromChild.set(selected);
  }

  showTable() {
    this.display.set(true);
  }

  onAdd() {
    const pokemonsToAdd = this.selectedFromChild().slice(0, this.freeSlots());
    const teamId = this.team()?.id;
    if (!teamId) {
      return;
    }
    this.teamDataService.updateTeam(teamId, pokemonsToAdd);
    this.display.set(false);
    this.selectedFromChild.set([]);
  }

  onCancel() {
    this.display.set(false);
  }

  onFiltersApplied(filters: PokemonFilters) {
    this.filters.set(filters);
  }

  deleteTeam() {
    const teamId = this.team()?.id;
    if (!teamId) {
      return;
    }
    this.teamDataService.deleteTeam(teamId);
  }
}
