import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {
s
  constructor(
    private http: HttpClient
  ) {

  }

  public getAllTodos(): Observable<any> {
    return this.http
      .get(API_URL + '/todos');
  }

  // API: POST /todos
  public createTodo() {
    // will use this.http.post()
  }

  // API: GET /todos/:id
  public getTodoById() {
    // will use this.http.get()
  }

  // API: PUT /todos/:id
  public updateTodo() {
    // will use this.http.put()
  }

  // DELETE /todos/:id
  public deleteTodoById() {
    // will use this.http.delete()
  }
}
