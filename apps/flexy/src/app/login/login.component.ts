import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../../libs/auth/auth.service";
import { catchError, of, Subscription, tap } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean;
  userNotExist = false;
  loginSubscription: Subscription | null = null;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
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
    this.userNotExist = false;
    this.loginSubscription = this.authService.loginUser(this.loginForm.value).pipe(
      tap(
        resData => {
          if (resData?.statusCode) {
            switch (resData.statusCode) {
              case 200:
                this.router.navigate(["main"]);
                sessionStorage.setItem("token", resData.data);
                this.isLoading = false;
                break;
              case 999:
                this.userNotExist = true;
                this.isLoading = false;
                console.log(this.userNotExist);
                this.cd.markForCheck();
                break;
              case 777:
                this.router.navigateByUrl("results");
                sessionStorage.setItem("token", resData.data);
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
    this.userNotExist = false;
  }
}
