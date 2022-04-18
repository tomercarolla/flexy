import { Query } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { ManagerState, ManagerStore } from "./manager.store";

@Injectable({providedIn: 'root'})
export class ManagerQuery extends Query<ManagerState> {
  selectStudents$ = this.select(store => store.students);
  selectTeachers$ = this.select(store => store.managers);
  selectStudentsAnswers$ = this.select(store => store.studentAnswers);
  selectStudentsLatestResults$ = this.select(store => store.studentLatestResults);
  selectIsLoading$ = this.select(store => store.isLoading);

  constructor(store: ManagerStore) {
    super(store);
  }
}
