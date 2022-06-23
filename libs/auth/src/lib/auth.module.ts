import {InjectionToken, ModuleWithProviders, NgModule} from "@angular/core";
import {AuthModel} from "./auth.model";

export const authInjectionToken = new InjectionToken<AuthModel>('auth');

@NgModule()
export class AuthModule {
  static root(options: AuthModel): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: authInjectionToken,
          useValue: options,
        }
      ]
    }
  }
}
