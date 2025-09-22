import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from '@core/models';
import { CardModule } from 'primeng/card';
import { DecimetersToMetersPipe, GenerationPipe } from '@shared/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';

@Component({
  selector: 'pokemon-card',
  imports: [
    CardModule,
    CommonModule,
    GenerationPipe,
    TranslateModule,
    DecimetersToMetersPipe,
    PokemonTypesComponent,
  ],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input<Pokemon>();
}
