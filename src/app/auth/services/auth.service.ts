import { BaseService } from './../../core/services/base-service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessageService } from '../../core/services/message.service';

@Injectable()
export class AuthService extends BaseService {
  private BASE_URL = 'api/users';

  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  isAuthtenticated(): boolean {
    return this.getToken() ? true : false;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.BASE_URL).pipe(
      tap(_ => this.log(`Iniciando session para usuario ${email}`)),
      map(users => {
        const user = users.find(element => element.email === email);

        if (user) {
          if (user.password !== password) {
            throw new Error('Invalid password');
          }
          return user;
        } else {
          throw new Error('User does not exist');
        }
      }),
      tap(user => {
        if (user && user.token) {
          localStorage.setItem('token', user.token);
        }

        const fetched = user ? 'fetched' : throwError;
        this.log(`${fetched} with email ${email}`);
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }

  signUp(email: string, password: string): Observable<User> {
    // tslint:disable-next-line:max-line-length
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ.eyJpZCI6IjEiLCJuYW1lIjoiRWR1YXJkbyBBdmlsZXMiLCJlbWFpbCI6ImVkdWFyZG9AbWFpbC5jb20ifQ.tC6aOCyBZwnmo5DcKGLtm4B1gXCX6oXUMKCjSHHxDO8`;
    return this.http.post<User>(
      this.BASE_URL,
      {
        email: email,
        password: password,
        token: token
      },
      this.httpOptions
    );
  }

  getStatus(isAuth: boolean): Observable<any> {
    return this.http.get<User>('api/status');
  }
}
