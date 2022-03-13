import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, of } from "rxjs";
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

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

  public isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    if(token) {
      const userClaims = jwtDecode<UserClaims>(token);

      if(userClaims) {
        return new Date().getTime() / 1000 < userClaims.exp;
      } else {
        return false;
      }
    } else {
      return false
    }
  }
}
