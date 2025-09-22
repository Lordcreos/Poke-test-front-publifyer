import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Type } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';
import { lighten, getTypeColor } from '@shared/utils';

@Component({
  selector: 'pokemon-types',
  imports: [CommonModule, TranslateModule],
  templateUrl: './pokemon-types.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTypesComponent {
  public type = input.required<Type>();

  lighten(hex: string, percent: number) {
    return lighten(hex, percent);
  }

  getTypeColor(type: Type) {
    return getTypeColor(type);
  }
}
