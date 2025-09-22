import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimetersToMeters',
})
export class DecimetersToMetersPipe implements PipeTransform {
  transform(value: number | undefined): number {
    if (value === undefined) return 0;
    return value / 10;
  }
}
