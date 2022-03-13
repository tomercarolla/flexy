import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      {
        path: "students",
        loadChildren: () => import("./../students/students.module").then(m => m.StudentsModule)
        // canActivate: [AuthGuard],
        // data: {
        //   role: 'ADMIN'
        // }
      },
      {
        path: "teachers",
        loadChildren: () => import("./../teachers/teachers.module").then(m => m.TeachersModule)
        // canActivate: [AuthGuard],
        // data: {
        //   role: 'USER'
        // }
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
