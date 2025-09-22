import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from '@core/models';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';
import { TranslateModule } from '@ngx-translate/core';
import { GenerationNumberPipe } from '@shared/pipes';

@Component({
  selector: 'pokemon-recomended-card',
  imports: [CommonModule, PokemonTypesComponent, TranslateModule, GenerationNumberPipe],
  templateUrl: './pokemon-recomended-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonRecomendedCardComponent {
  public pokemon = input<Pokemon>();
}
