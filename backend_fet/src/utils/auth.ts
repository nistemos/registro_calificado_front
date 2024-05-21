
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'; // Importa dotenv
dotenv.config(); // Carga las variables de entorno desde el archivo .env

export function generateToken(payload: any): string {
    return jwt.sign(payload, process.env.SECRETJWT, { expiresIn: '24h' }); // Personaliza el tiempo de expiración
}

export function validateToken(token: string): boolean {
    try {
      // Verificar el token usando la clave secreta
      jwt.verify(token, process.env.SECRETJWT);
      return true; // El token es válido
    } catch (error) {
      return false; // El token es inválido
    }
  }

  export function getTokenPayload(token: string): boolean {
    try {
      // Verificar el token usando la clave secreta
      return jwt.verify(token, process.env.SECRETJWT); // El token es válido
    } catch (error) {
      return false; // El token es inválido
    }
  }


export function getBearerTokenFromJSON(req) {

  // Obtén el encabezado de autorización de la solicitud
  const authorizationHeader = req.headers['authorization'];

  // Verifica si el encabezado de autorización existe
  if (!authorizationHeader) {
    // Si no hay encabezado de autorización, devuelve null o un valor predeterminado
    return null;
  }

  // Divide el encabezado de autorización para obtener el token
  const partes = authorizationHeader.split(' ');
  if (partes.length !== 2 || partes[0].toLowerCase() !== 'bearer') {
    // Si el formato no es el esperado, devuelve null o un valor predeterminado
    return null;
  }

  // Devuelve el token JWT (JSON Web Token)
  return partes[1];
};

export async function extractRoleFromToken(token: string): Promise<string> {
  try {
    // Decodificar el token y extraer el rol del payload
    const decodedToken = await jwt.verify(token, process.env.SECRETJWT);
    return decodedToken.user.role
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return '';
  }
}
