import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from '@core/models';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';

@Component({
  selector: 'pokemon-home-card',
  imports: [CommonModule, PokemonTypesComponent],
  templateUrl: './pokemon-home-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonHomeCardComponent {
  public pokemon = input<Pokemon>();
}
