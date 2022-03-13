import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { UserInterface } from "../shared/user.interface";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../apps/flexy/src/environments/environment";
import { Response } from "../shared/response.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {
  }

  loginUser(user: UserInterface) {
    const formData: any = new FormData();
    formData.append("Action", "loginUser");
    formData.append("phone", user.phone);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  loginManager(user: UserInterface) {
    return of(true);
    // this.setUser(user);
    // return this.http.post<Response<string>>(`${environment.baseUrl}?Action=loginManager`,
    //   {
    //     userName: user.userName,
    //     password: user.password
    //   });
  }

  logout() {
    sessionStorage.setItem('student', null);
    this.router.navigateByUrl('login');
  }
}
