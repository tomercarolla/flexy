import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../apps/flexy/src/environments/environment";
import { Observable } from "rxjs";
import { QuestionInterface } from "./question.interface";
import { Student, UserInterface } from "./user.interface";
import { Response } from "./response.interface";

@Injectable({
  providedIn: "root"
})
export class FlexyService {

  constructor(private http: HttpClient) {
  }

  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(`${environment.baseUrl}?Action=getAllQuestions`);
  }

  getAllStudents(): Observable<UserInterface[]> {
    return this.http.get<Student[]>(`${environment.baseUrl}?Action=getAllStudents`);
  }

  getAllManagers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.baseUrl}?Action=getAllManagers`);
  }

  getStudentAnswers(studentPhone) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("Action", "getStudentAnswers");
    formData.append("token", userToken);
    formData.append("studentPhone", studentPhone);
    // const params = { studentPhone };
    return this.http.post<Response<string>>(`${environment.baseUrl}?Action=getStudentAnswers`, formData );
  }

  updateAnswers(results, total: { visual, movement, auditory }) {
    const formData = new FormData();
    const answers = sessionStorage.getItem("questions");
    const userToken = sessionStorage.getItem("token");
    formData.append("Action", "postQuestionaryByUser");
    formData.append("token", userToken);
    formData.append("answers", answers);
    formData.append("latestResults", results);
    formData.append("totalVisual", total.visual);
    formData.append("totalMovement", total.movement);
    formData.append("totalAuditory", total.auditory);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  addUpdateStudentProfile(id, user) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "addUpdateStudentProfile");
    if (id) {
      formData.append("id", id);
    }
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("phone", user.phone);
    formData.append("school", user.school);
    formData.append("year", user.year);
    formData.append("studentProgress", user.studentProgress);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  addUpdateManagerProfile(id, user) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "addUpdateManagerProfile");
    if (id) {
      formData.append("id", id);
    }
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("userName", user.userName);
    formData.append("phone", user.phone);
    formData.append("password", user.password);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  deleteManager(id) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "deleteManager");
    formData.append("id", id);

    return this.http.post<Response<string>>(`${environment.baseUrl}`, formData);
  }

  deleteStudent(phone) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "deleteStudent");
    formData.append("phone", phone);

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
