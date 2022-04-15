import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { AuthGuard } from "../../../../../libs/auth/auth.guard";
import { RoleGuard } from "../../../../../libs/auth/role-guard";

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      {
        path: "students",
        loadChildren: () => import("./../students/students.module").then(m => m.StudentsModule),
        canActivate: [AuthGuard]
      },
      {
        path: "teachers",
        loadChildren: () => import("./../teachers/teachers.module").then(m => m.TeachersModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          redirectUrl: ['/main/students'],
          roles: ['admin']
        }
      },
      { path: "**", redirectTo: "students" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
