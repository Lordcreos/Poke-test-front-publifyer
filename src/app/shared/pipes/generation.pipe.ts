import { Pipe, type PipeTransform } from '@angular/core';
import { Generation } from '@core/models';

@Pipe({
  name: 'generation',
})
export class GenerationPipe implements PipeTransform {
  transform(value: Generation | undefined): string {
    if (!value) return '';

    if (value === Generation.Unknown) return 'Unknown';

    const parts = value.split('-');
    const roman = parts[1].toUpperCase();
    return `Gen ${roman}`;
  }
}
