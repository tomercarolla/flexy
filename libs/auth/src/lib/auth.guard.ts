import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import jwtDecode from "jwt-decode";

interface UserClaims {
  exp: number;
  unique_name: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.isLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }

  public isLoggedIn(): boolean {
    const token = sessionStorage.getItem("token");
    if (token) {
      const userClaims = jwtDecode<UserClaims>(token);

      if (userClaims) {
        sessionStorage.setItem("role", userClaims["role"]);
        return new Date().getTime() / 1000 < userClaims.exp;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
