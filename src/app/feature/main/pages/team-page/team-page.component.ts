import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pokemon, PokemonFilters, Team, Type } from '@core/models';
import { TeamDataService } from '@core/services';
import { PokemonCardComponent } from '@feature/main/components/pokemon-card/pokemon-card.component';
import { PokemonSearchTableComponent } from '@feature/main/components/pokemon-search-table/pokemon-search-table.component';
import { PokemonTypesComponent } from '@feature/main/components/pokemon-types/pokemon-types.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-team-page',
  imports: [
    CommonModule,
    TranslateModule,
    PokemonTypesComponent,
    DialogModule,
    PokemonSearchTableComponent,
    ButtonModule,
    PokemonCardComponent,
    RouterLink,
  ],
  templateUrl: './team-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TeamPageComponent {
  private route = inject(ActivatedRoute);
  private teamDataService = inject(TeamDataService);

  team = signal<Team | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.team.set(this.teamDataService.getTeamById(id) ?? null);
    }

    console.log(this.team());
  }

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
    this.team.set(this.teamDataService.getTeamById(teamId) ?? null);
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
