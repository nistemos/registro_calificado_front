export interface Auth {
  email: string;
  clave: string;
}

export interface AuthResult{
  errorType: string;
  statusCode: number;
  message: string;
}
