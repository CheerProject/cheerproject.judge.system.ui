import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './auth/services/auth.service';
import { Store, Select } from '@ngxs/store';
import { AuthState } from './auth/state/auth.state';
import { Observable } from 'rxjs';
import { Logout } from '../app/auth/actions/auth.actions';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cheer app';

  username$: Observable<string>;

  constructor(private location: Location, private auth: AuthService, private store: Store, private router: Router) {
    this.username$ = this.store.selectOnce(state => state.auth.email).pipe(
      map((email: string) => email? email.split("@")[0]: '')
    );
  }
  goBack(): void {
    this.location.back();
  }

  isAuthenticated(): boolean {
    const token = this.store.selectSnapshot(AuthState.token);
    return token ? true : false;
  }

  logout() {
    this.store.dispatch(new Logout()).subscribe(() => this.router.navigateByUrl('/login'));
  }
}
