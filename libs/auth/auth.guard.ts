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

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.isLoggedIn()) {
      if (route.data["roles"].includes(this.authService.getRole())) {
        return true;
      } else {
        //managers
        if (this.authService.getRole() === "user") {
          this.router.navigateByUrl("students");
        } else if (this.authService.getRole() === "admin") {
          this.router.navigateByUrl("students");
        }

        //students
        if (this.authService.getRole() === "startQuest") {
          this.router.navigateByUrl("main");
        } else if (this.authService.getRole() === "endQuest") {
          this.router.navigateByUrl("results");
        }
        return false;
        // this.router.navigateByUrl("noMobile");
        // return false;
      }
    } else {
      this.router.navigateByUrl("login");
      return false;
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
