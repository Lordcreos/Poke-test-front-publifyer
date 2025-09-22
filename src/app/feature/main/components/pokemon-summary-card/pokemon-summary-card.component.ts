import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-summary-card',
  imports: [],
  templateUrl: './pokemon-summary-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSummaryCardComponent { }
