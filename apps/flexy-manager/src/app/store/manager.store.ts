import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { Student, UserInterface } from "@flexy/shared";
import { QuestionInterface, ResultsInterface } from "@flexy/shared";

export interface ManagerState {
  students: Student[];
  managers: UserInterface[];
  studentAnswers: QuestionInterface[];
  studentLatestResults: ResultsInterface[];
  isLoading: boolean;
}

export function createInitialState(): ManagerState {
  return {
    students: [],
    managers: [],
    studentAnswers: null,
    studentLatestResults: null,
    isLoading: false
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "student" })
export class ManagerStore extends Store<ManagerState> {
  constructor() {
    super(createInitialState());
  }
}
