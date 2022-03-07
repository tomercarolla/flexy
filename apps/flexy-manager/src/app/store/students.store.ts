import { Store, StoreConfig } from '@datorama/akita';
import {Injectable} from "@angular/core";
import { UserInterface } from "../../../../../libs/shared/user.interface";

export interface StudentState {
  students: UserInterface[];
}

export function createInitialState(): StudentState {
  return {
    students: []
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'student' })
export class StudentsStore extends Store<StudentState> {
  constructor() {
    super(createInitialState());
  }
}
