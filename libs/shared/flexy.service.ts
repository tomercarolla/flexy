import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../apps/flexy/src/environments/environment";
import { Observable } from "rxjs";
import { QuestionInterface } from "./question.interface";
import { Student, UserInterface } from "./user.interface";
import { Response } from "./response.interface";

@Injectable({
  providedIn: 'root'
})
export class FlexyService {

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(`${environment.baseUrl}?Action=getAllQuestions`);
  }

  getAllStudents(): Observable<UserInterface[]> {
    return this.http.get<Student[]>(`${environment.baseUrl}?Action=getAllStudents`);
  }

  getAllManagers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.baseUrl}?Action=getAllManagers`);
  }

  updateAnswers() {
    const formData: any = new FormData();
    const answers = sessionStorage.getItem('questions');
    const userToken = sessionStorage.getItem('token');
    formData.append("Action", "updateAnswers");
    formData.append("phone", userToken);
    formData.append("answers", answers);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  // getAllStudents(
  //   filter = '', sortOrder = 'asc',
  //   pageNumber = 0, pageSize = 30
  // ): Observable<StudentInterface[]> {
  //   return this.http.get<StudentInterface[]>(`${environment.baseUrl}?Action=getAllStudents`, {
  //     params: new HttpParams()
  //       .set('filter', filter)
  //       .set('sortOrder', sortOrder)
  //       .set('pageNumber', pageNumber.toString())
  //       .set('pageSize', pageSize.toString())
  //   }).pipe(
  //     map(result => result['payload'])
  //   );
  // }
}
