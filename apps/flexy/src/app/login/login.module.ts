import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule, FooterModule } from "@flexy/ui";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FooterModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
