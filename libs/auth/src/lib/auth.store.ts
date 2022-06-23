import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

export interface AuthState {
  userToken: string;
  managerToken: string;
  phoneNotExist: string;
  userNameOrPasswordError: string;
}

export function createInitialState(): AuthState {
  return {
    userToken: "",
    managerToken: '',
    phoneNotExist: '',
    userNameOrPasswordError: ''
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "Auth" })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
