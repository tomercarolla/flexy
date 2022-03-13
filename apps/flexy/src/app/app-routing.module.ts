import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../libs/auth/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/question/question.module').then(m => m.QuestionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'results',
    loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
