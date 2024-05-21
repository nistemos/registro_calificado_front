import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { extractRoleFromToken, getBearerTokenFromJSON, getTokenPayload, validateToken } from 'src/utils/auth';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private readonly allowedRoles: string[]) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const token = getBearerTokenFromJSON(context.switchToHttp().getRequest())

    if(token !== null){
      const isValidToken = validateToken(token);

      if (isValidToken) {
        const userRoles = await extractRoleFromToken(token);
        context.switchToHttp().getRequest().user = getTokenPayload(token) 
        return this.matchRoles(userRoles);
      }
    }
    return false;
  }

  private matchRoles(userRoles: string): boolean {
    // Convierte el string de roles del usuario a un array
    const userRolesArray = [userRoles];
  
    // Verifica si al menos uno de los roles permitidos está presente en los roles del usuario
    return userRolesArray.some(role => this.allowedRoles.includes(role));
  }
}
