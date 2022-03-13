import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../../libs/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      password: ["", [Validators.required]]
    });
  }

  login() {
    // this.isLoading = true;
    this.router.navigateByUrl('main');
    // this.authService.loginManager(this.loginForm.value).pipe(
    //   tap(
    //     resData => {
    //       console.log(resData);
    //       this.isLoading = false;
    //       return this.router.navigateByUrl("/main");
    //     }
    //   )
    // ).subscribe();
  }
}
