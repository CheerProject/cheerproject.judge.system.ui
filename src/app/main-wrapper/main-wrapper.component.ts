import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Store, Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { Logout } from '../auth/store/actions/auth.actions';

@Component({
    selector: 'app-main-wrapper',
    templateUrl: './main-wrapper.component.html',
    styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent implements OnInit {
    title = 'Grupos';

    username$: Observable<string>;

    constructor(
        private location: Location,
        private auth: AuthService,
        private store: Store,
        private router: Router
    ) {
        this.username$ = this.store
            .selectOnce(state => state.auth.email)
            .pipe(map((email: string) => (email ? email.split('@')[0] : '')));
    }

    ngOnInit(): void { }
    goBack(): void {
        this.location.back();
    }

    isAuthenticated(): boolean {
        const token = this.auth.getToken();
        return token ? true : false;
    }

    logout() {
        this.store
            .dispatch(new Logout())
            .subscribe(() => this.router.navigateByUrl('/login'));
    }

    setTitle(title) {
        this.title = title;
    }
}
