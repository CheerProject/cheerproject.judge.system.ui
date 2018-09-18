import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';

@Injectable()
export class AuthGuardService implements CanActivate {
  authState: Observable<any>;
  constructor(public auth: AuthService, public router: Router, private _store: Store) {}
  canActivate(): boolean {

    const token = this._store.selectSnapshot(AuthState.token);

    if (token) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
