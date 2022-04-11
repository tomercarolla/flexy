import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { AuthGuard } from "../../../../../libs/auth/auth.guard";

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      {
        path: "students",
        loadChildren: () => import("./../students/students.module").then(m => m.StudentsModule),
        canActivate: [AuthGuard],
        data: {
          roles: ['user', 'admin']
        }
      },
      {
        path: "teachers",
        loadChildren: () => import("./../teachers/teachers.module").then(m => m.TeachersModule),
        canActivate: [AuthGuard],
        data: {
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
