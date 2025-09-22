export interface CityResponse {
  results: City[];
  generationtime_ms: number;
}

export interface City {
  name: string;
  country_code: string;
}
