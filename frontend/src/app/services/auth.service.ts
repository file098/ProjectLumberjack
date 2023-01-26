import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient, private _api: ApiService) {}

  signUp(body: User): Observable<any> {
    return this.http.post(this.baseURL + 'signup', body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  signIn(body: User): Observable<any> {
    return this.http.post(this.baseURL + 'signin', body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  signOut(body: string): Observable<any> {
    return this.http.post(this.baseURL + 'signout', body).pipe(
      tap({
        next: (data) => {
          console.log(data);

          localStorage.removeItem('token');
        },
        error: (error) => console.log(error),
      })
    );
  }
}
