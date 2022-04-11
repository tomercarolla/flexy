import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoMobileMessageRoutingModule } from './no-mobile-message-routing.module';
import { NoMobileMessageComponent } from "./no-mobile-message.component";


@NgModule({
  declarations: [NoMobileMessageComponent],
  imports: [
    CommonModule,
    NoMobileMessageRoutingModule
  ],
  exports: [NoMobileMessageComponent]
})
export class NoMobileMessageModule { }
