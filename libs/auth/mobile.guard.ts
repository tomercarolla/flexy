import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable({
  providedIn: "root"
})
export class MobileGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private deviceDetector: DeviceDetectorService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    //students
    if (this.deviceDetector.isMobile()) {
      return true;
    } else {
      return this.router.createUrlTree(['/noMobile']);
    }
  }

}
