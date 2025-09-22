import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokeFiltersApiService extends ApiService {
  private baseUrl = environment.baseUrl;

  public async getTypes(): Promise<string[]> {
    return await this.request<any>(`${this.baseUrl}/type?limit=1000`, {
      method: 'GET',
    }).then((response) => {
      const types: string[] = response.results.map((type: any) => type.name);
      return types;
    });
  }

  public async getRegions(): Promise<string[]> {
    return await this.request<any>(`${this.baseUrl}/region?limit=1000`, {
      method: 'GET',
    }).then((response) => {
      const regions: string[] = response.results.map((region: any) => region.name);
      return regions;
    });
  }

  public async getGenerations(): Promise<string[]> {
    return await this.request<any>(`${this.baseUrl}/generation?limit=1000`, {
      method: 'GET',
    }).then((response) => {
      const generations: string[] = response.results.map((gen: any) => gen.name);
      return generations;
    });
  }
}
