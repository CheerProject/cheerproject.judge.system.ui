import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  authState: Observable<any>;
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {

    if (this.auth.isAuthtenticated()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
