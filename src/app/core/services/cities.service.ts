import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { City, CityResponse } from '../models';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const MINIMUM_CHARACTERS = 3;
const MAXIMUM_RESULTS = 10;

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private translateService = inject(TranslateService);
  private http = inject(HttpClient);

  public async getCitiesOptions(city: string): Promise<City[]> {
    if (!city || city.trim().length < MINIMUM_CHARACTERS) return [];

    const language = this.translateService.getCurrentLang() || 'es';

    const res = await firstValueFrom(
      this.http.get<CityResponse>(
        `${GEOCODING_API_URL}?name=${city}&language=${language}&count=${MAXIMUM_RESULTS}&format=json`
      )
    ).then(
      (response) =>
        response.results?.map((item) => ({
          name: item.name,
          country_code: item.country_code,
        })) ?? []
    );

    const uniqueCities = res.filter(
      (city, index, self) =>
        index ===
        self.findIndex((c) => c.name === city.name && c.country_code === city.country_code)
    );

    return uniqueCities;
  }
}
