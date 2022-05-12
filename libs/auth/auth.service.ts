import { Injectable } from "@angular/core";
import { UserInterface } from "../shared/user.interface";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../apps/flexy/src/environments/environment";
import { Response } from "../shared/response.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  role: string;

  constructor(private router: Router, private http: HttpClient) {
  }

  loginUser(user: UserInterface) {
    const formData: any = new FormData();
    formData.append("Action", "loginUser");
    formData.append("phone", user.phone);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  loginManager(user: UserInterface) {
    const formData: any = new FormData();
    formData.append("Action", "loginManager");
    formData.append("userName", user.userName);
    formData.append("userPassword", user.password);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  getRole() {
    return this.role = sessionStorage.getItem('role');
  }

  getIsMobile() {
    return false;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
