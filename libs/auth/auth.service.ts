import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserInterface } from "../shared/user.interface";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../apps/flexy/src/environments/environment";

interface AuthResponseData {
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: number;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  constructor(private router: Router, private http: HttpClient) {
  }

  getUser(): Observable<UserInterface | null> {
    return this.user$.asObservable();
  }

  login(user: UserInterface) {
    this.setUser(user);
    return this.http.post<AuthResponseData>(`${environment.baseUrl}?Action=loginUser`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      });
  }

  logout() {
    this.setUser(null);
    this.router.navigateByUrl("/login");
  }

  private setUser(user: UserInterface) {
    this.user$.next(user);
  }
}
