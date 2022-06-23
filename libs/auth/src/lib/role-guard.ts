import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (route.data['roles'].includes(this.authService.getRole())) {
      return true;
    } else {
      return this.router.createUrlTree(route.data['redirectUrl'])
    }
  }
}
