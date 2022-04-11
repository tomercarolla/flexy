import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../../libs/auth/auth.service";
import { Subscription, tap } from "rxjs";
import { AuthStore } from "../../../../../libs/auth/auth.store";
import { AuthQuery } from "../../../../../libs/auth/auth.query";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean;
  loginSubscription: Subscription | null = null;

  phoneNotExist$ = this.authQuery.selectPhoneNotExist$;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private authStore: AuthStore,
    private authQuery: AuthQuery
  ) {
  }

  ngOnInit() {
    sessionStorage.setItem("token", null);
    sessionStorage.setItem("questions", null);
    this.loginForm = this.fb.group({
      phone: ["",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ]
    });
  }

  login() {
    this.isLoading = true;
    this.authStore.update((store) => ({
      ...store,
      phoneNotExist: ''
    }));
    this.loginSubscription = this.authService.loginUser(this.loginForm.value).pipe(
      tap(
        resData => {
          if (resData?.statusCode) {
            switch (resData.statusCode) {
              case 200:
                sessionStorage.setItem("token", resData.data);
                this.isLoading = false;
                this.router.navigate(["main"]);
                break;
              case 999:
                this.authStore.update((store) => ({
                  ...store,
                  phoneNotExist: resData.message
                }));
                this.isLoading = false;
                this.cd.markForCheck();
                break;
              case 777:
                sessionStorage.setItem("token", resData.data);
                sessionStorage.setItem("questions", resData.message);
                this.isLoading = false;
                this.router.navigate(["results"]);
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
      phoneNotExist: ''
    }));
  }
}
