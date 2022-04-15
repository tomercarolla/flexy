import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../libs/auth/auth.guard";
import { MobileGuard } from "../../../../libs/auth/mobile.guard";
import { RoleGuard } from "../../../../libs/auth/role-guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard, RoleGuard, MobileGuard],
    data: {
      redirectUrl: ['/main'],
      roles: ['startQuest']
    }
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/question/question.module').then(m => m.QuestionModule),
    canActivate: [AuthGuard, RoleGuard, MobileGuard],
    data: {
      redirectUrl: ['/question'],
      roles: ['startQuest']
    }
  },
  {
    path: 'results',
    loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsModule),
    canActivate: [AuthGuard, MobileGuard]
  },
  {
    path: 'noMobile',
    loadChildren: () => import('./pages/no-mobile-message/no-mobile-message.module').then(m => m.NoMobileMessageModule),
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
