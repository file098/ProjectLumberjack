import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Session } from '../models/sessions.model';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  baseURL = 'http://localhost:8080/api/';

  constructor(private _api: ApiService, private http: HttpClient) {}

  getTotal(): Observable<any> {
    // con l'uso di {observe: 'response'} ritorno tutto l'observable, non solo il JSON
    // return this.http.get(this.baseURL + 'getAll', { observe: 'response' });
    return this.http
      .get(this.baseURL + 'getAllHandy')
      .pipe(catchError(this._api.handleError));
  }

  getUserTotal(username: string): Observable<any> {
    let body = { username: username };
    return this.http
      .get(this.baseURL + 'userHandy', { params: body })
      .pipe(catchError(this._api.handleError));
  }

  getScoreboard(): Observable<[{ username: string; total: number }] | any> {
    return this.http
      .get(this.baseURL + 'scoreboard')
      .pipe(catchError(this._api.handleError));
  }

  add(username: string, session: Session): Observable<any> {
    const payload = {
      username: username,
      session: session,
    };

    return this.http
      .post(this.baseURL + 'addHandy', payload)
      .pipe(catchError(this._api.handleError));
    // .pipe(catchError(this._api.handleError));
  }
}
