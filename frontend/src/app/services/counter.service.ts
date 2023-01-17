import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  baseURL = 'http://localhost:4000/user/';

  constructor(private _api: ApiService, private http: HttpClient) {}

  getTotal(): Observable<any> {
    // con l'uso di {observe: 'response'} ritorno tutto l'observable, non solo il JSON
    // return this.http.get(this.baseURL + 'getAll', { observe: 'response' });
    return this.http
      .get(this.baseURL + 'getAll')
      .pipe(catchError(this._api.handleError));
  }

  getUserTotal(username: string): Observable<any> {
    let body = { username: username };
    return this.http
      .get(this.baseURL + 'getUserTotal', { params: body })
      .pipe(catchError(this._api.handleError));
  }

  getScoreboard(): Observable<[{ username: string; total: number }] | any> {
    return this.http
      .get(this.baseURL + 'scoreboard')
      .pipe(catchError(this._api.handleError));
  }

  add(username: string): any {
    let body = { username: username };
    return this._api.postTypeRequest('user/add', body).subscribe((res: any) => {
      return res;
    });
  }
}
