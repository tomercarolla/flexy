import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { Student, UserInterface } from "../../../../../libs/shared/user.interface";

export interface ManagerState {
  students: Student[];
  managers: UserInterface[];
}

export function createInitialState(): ManagerState {
  return {
    students: [],
    managers: []
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "student" })
export class ManagerStore extends Store<ManagerState> {
  constructor() {
    super(createInitialState());
  }
}
