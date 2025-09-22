import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  protected async request<T>(
    url: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
    } = {}
  ): Promise<T> {
    const { method = 'POST', body = {} } = options;

    try {
      switch (method) {
        case 'GET':
          return await firstValueFrom(this.http.get<T>(url));
        case 'POST':
          return await firstValueFrom(this.http.post<T>(url, body));
        case 'PUT':
          return await firstValueFrom(this.http.put<T>(url, body));
        case 'DELETE':
          return await firstValueFrom(this.http.delete<T>(url));
        default:
          throw new Error('Unsupported HTTP method');
      }
    } catch (err: any) {
      const errorResponse: ErrorResponse = {
        status: err.status,
        message: err.error?.message ?? null,
        errors: err.error?.errors ?? null,
      };
      throw errorResponse;
    }
  }
}
