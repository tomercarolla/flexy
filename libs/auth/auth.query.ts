import { Query } from "@datorama/akita";
import { AuthState, AuthStore } from "./auth.store";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthQuery extends Query<AuthState> {

  selectUserToken$ = this.select(store => store.userToken);
  selectManagerToken$ = this.select(store => store.managerToken);

  selectPhoneNotExist$ = this.select(store => store.phoneNotExist);
  selectUserNameOrPasswordError$ = this.select(store => store.userNameOrPasswordError);

  constructor(protected store: AuthStore) {
    super(store);
  }
}
