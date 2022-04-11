import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoMobileMessageComponent } from "./no-mobile-message.component";

const routes: Routes = [
  { path: "", component: NoMobileMessageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoMobileMessageRoutingModule {
}
