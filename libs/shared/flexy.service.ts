import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionInterface} from "./question.interface";
import {Student, UserInterface} from "./user.interface";
import {Response} from "./response.interface";
import {authInjectionToken} from "../auth";
import {AuthModel} from "../auth";

@Injectable({
  providedIn: "root"
})
export class FlexyService {

  constructor(private http: HttpClient, @Inject(authInjectionToken) private readonly authOptions: AuthModel) {
  }

  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>(`${this.authOptions.baseUrl}?Action=getAllQuestions`);
  }

  getAllStudents(): Observable<UserInterface[]> {
    return this.http.get<Student[]>(`${this.authOptions.baseUrl}?Action=getAllStudents`);
  }

  getAllManagers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.authOptions.baseUrl}?Action=getAllManagers`);
  }

  getStudentAnswers(studentPhone) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("Action", "getStudentAnswers");
    formData.append("token", userToken);
    formData.append("studentPhone", studentPhone);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}?Action=getStudentAnswers`, formData);
  }

  getStudentLatestResults(studentPhone) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("Action", "getStudentLatestResults");
    formData.append("token", userToken);
    formData.append("studentPhone", studentPhone);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}?Action=getStudentLatestResults`, formData);
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

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
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

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
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

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
  }

  deleteManager(id) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "deleteManager");
    formData.append("id", id);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
  }

  deleteStudent(phone) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "deleteStudent");
    formData.append("phone", phone);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
  }

  resetQuestinaryPerStudend(phone) {
    const formData = new FormData();
    const userToken = sessionStorage.getItem("token");
    formData.append("token", userToken);
    formData.append("Action", "resetQuestionaryPerStudent");
    formData.append("phone", phone);

    return this.http.post<Response<string>>(`${this.authOptions.baseUrl}`, formData);
  }
}
