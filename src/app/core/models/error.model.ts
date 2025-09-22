export interface ErrorResponse {
  status: number;
  message: string | null;
  errors: any | null;
}
