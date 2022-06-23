import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, tap } from "rxjs";
import {AuthQuery, AuthService, AuthStore} from "@flexy/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  errorLoginMessage: string;
  isLoading: boolean;
  loginSubscription: Subscription | null = null;
  showPassword = false;

  userNameOrPasswordError$ = this.authQuery.selectUserNameOrPasswordError$;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authStore: AuthStore,
    private authQuery: AuthQuery,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      password: ["", [Validators.required]]
    });
  }

  login() {
    this.authStore.update((store) => ({
      ...store,
      userNameOrPasswordError: ''
    }));
    this.isLoading = true;
    this.loginSubscription = this.authService.loginManager(this.loginForm.value).pipe(
      tap(
        resData => {
          if(resData.statusCode) {
            switch (resData.statusCode) {
              case 200:
                this.router.navigate(["main"]);
                sessionStorage.setItem("userLogged", this.loginForm.value.userName)
                sessionStorage.setItem("token", resData.data);
                this.isLoading = false;
                break;
              case 999:
                this.authStore.update((store) => ({
                  ...store,
                  userNameOrPasswordError: resData.message
                }));
                this.isLoading = false;
                this.cd.markForCheck();
                break;
            }
          }
        }
      )
    ).subscribe();
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
    this.isLoading = false;
    this.authStore.update((store) => ({
      ...store,
      userNameOrPasswordError: ''
    }));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
