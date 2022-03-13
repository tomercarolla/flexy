import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DeviceGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.data['mobile']) {
      this.router.navigateByUrl('login');
      return false
    }
    return true;
  }
}
