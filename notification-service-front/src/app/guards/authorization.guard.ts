import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,MaybeAsync,RouterStateSnapshot,GuardResult} from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthorizationGuard{

  constructor(private authService:AuthService, private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult>{
    if(this.authService.isAuthenticated){
      let requiredRoles = route.data['roles'];
      let userRoles = this.authService.roles;

      for (let role of userRoles){
        if (requiredRoles.includes(role)) {
          return true;
        }
      }
      return false;
    }else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }
}

