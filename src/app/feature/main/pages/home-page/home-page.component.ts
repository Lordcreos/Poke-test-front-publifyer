import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '@core/services';
import { PokedexSummaryService } from '@core/services/pokedex-summary.service';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonHomeCardComponent } from '@feature/main/components/pokemon-home-card/pokemon-home-card.component';
import { PokemonRecomendedCardComponent } from '@feature/main/components/pokemon-recomended-card/pokemon-recomended-card.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    TranslateModule,
    PokemonHomeCardComponent,
    PokemonRecomendedCardComponent,
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {
  private authService = inject(AuthService);
  private pokedexSummary = inject(PokedexSummaryService);

  currentUser = this.authService.getCurrentUser();

  pokemonCount = this.pokedexSummary.pokemonCount;
  pokemonTotalCount = this.pokedexSummary.pokemonTotalCount;
  pokedexProgress = this.pokedexSummary.pokedexProgress;
  averageLevel = this.pokedexSummary.averageLevel;
  favoriteType = this.pokedexSummary.favoriteType;
  experienceCount = this.pokedexSummary.experienceCount;
  powerfulPokemon = this.pokedexSummary.powerfulPokemon;
  lastCaptured = this.pokedexSummary.lastCaptured;
  recommendedPokemons = this.pokedexSummary.recommendedPokemons;

  showAllMyPokemons = signal(false);

  displayedPokemons = computed(() => {
    const list = this.lastCaptured();
    return this.showAllMyPokemons() ? list : list.slice(0, 4);
  });

  toggleShowAllMyPokemons() {
    this.showAllMyPokemons.update((v) => !v);
  }

  showAllRecommendedPokemons = signal(false);

  displayedRecommendedPokemons = computed(() => {
    const list = this.recommendedPokemons();
    return this.showAllRecommendedPokemons() ? list : list.slice(0, 2);
  });

  toggleShowAllRecommendedPokemons() {
    this.showAllRecommendedPokemons.update((v) => !v);
  }
}
