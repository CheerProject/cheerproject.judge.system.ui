import { BaseService } from './../../core/services/base-service';
import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { MessageService } from '../../core/services/message.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/state/auth.state';

@Injectable()
export class AuthService extends BaseService {
  private BASE_URL = 'api/users';

  constructor(private _store: Store, private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

 
  login(payload: User): Observable<User> {
    return this.http.get<User[]>(this.BASE_URL).pipe(
      map(users => {
        const user = users.find(element => element.email === payload.email);

        if (user) {
          if (user.password !== payload.password) {
            throw new Error('Invalid password');
          }
          return user;
        } else {
          throw new Error('User does not exist');
        }
      }),
      catchError(this.handleError('Login',new User()))
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
