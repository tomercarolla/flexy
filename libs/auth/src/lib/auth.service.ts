import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Inject} from "@angular/core";
import {authInjectionToken} from "./auth.module";
import {AuthModel} from "./auth.model";
import {UserInterface} from "@flexy/shared";
import {Response} from "@flexy/shared";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  role: string;

  constructor(private router: Router, private http: HttpClient, @Inject(authInjectionToken) private readonly authOptions: AuthModel) {
  }

  loginUser(user: UserInterface) {
    const formData: any = new FormData();
    formData.append("Action", "loginUser");
    formData.append("phone", user.phone);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
  }

  loginManager(user: UserInterface) {
    const formData: any = new FormData();
    formData.append("Action", "loginManager");
    formData.append("userName", user.userName);
    formData.append("userPassword", user.password);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
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
