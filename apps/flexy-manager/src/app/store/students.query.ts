import { Query } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { StudentState, StudentsStore } from "./students.store";

@Injectable({providedIn: 'root'})
export class StudentsQuery extends Query<StudentState> {
  selectStudents$ = this.select(store => store.students);

  constructor(store: StudentsStore) {
    super(store);
  }
}
