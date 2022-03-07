import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../../libs/auth/auth.service";
import { catchError, tap } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorLoginMessage: string;
  isLoading: boolean;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).pipe(
      tap(
        resData => {
          console.log(resData);
          this.router.navigateByUrl("/main");
          this.isLoading = false;
        },
        catchError(err => {
          this.isLoading = false;
          return this.errorLoginMessage = err;
        })
      )
    ).subscribe();
  }
}
