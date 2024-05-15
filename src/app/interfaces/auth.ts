export interface Auth {
  email: string;
  clave: string;
}

export interface AuthResult{
  mmessage: string;
  data:{
    token: string;
    user:{}
  };
  status: number;
}
