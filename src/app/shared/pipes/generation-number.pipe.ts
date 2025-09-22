import { Pipe, type PipeTransform } from '@angular/core';
import { Generation } from '@core/models';

@Pipe({
  name: 'generationNumber',
})
export class GenerationNumberPipe implements PipeTransform {
  transform(value: Generation | undefined): number {
    if (!value) return 0;

    if (value === Generation.Unknown) return 0;

    const parts = value.split('-');
    const roman = parts[1].toUpperCase();

    const romanToNumber = (roman: string): number => {
      const map: { [key: string]: number } = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
      };
      let num = 0;
      let prev = 0;
      for (let i = roman.length - 1; i >= 0; i--) {
        const curr = map[roman[i]];
        if (curr < prev) {
          num -= curr;
        } else {
          num += curr;
        }
        prev = curr;
      }
      return num;
    };

    const number = romanToNumber(roman);
    return number;
  }
}
