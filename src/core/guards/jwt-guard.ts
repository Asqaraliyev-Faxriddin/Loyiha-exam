import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
 async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    
    let token =this.tokentekshir(request)
   
    if(!token) throw new UnauthorizedException()

    try {
            
    } catch (error) {
            
    }
    return true
  }

  tokentekshir(request:Request){

    let [type,token] = request.headers.authorization?.split(" ") || [] 
    
    return type=="Bearer"?token:undefined
  }
}
