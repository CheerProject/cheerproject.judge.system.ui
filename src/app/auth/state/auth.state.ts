import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Login, Logout } from '../actions/auth.actions';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@State<User>({
    name: 'auth',
    defaults: {
        token: '',
        email:''
    }
})
export class AuthState {

    @Selector()
    static token(state: User) { return state.token }

    constructor(private authService: AuthService) { }

    @Action(Login)
    login({ patchState }: StateContext<User>, { user }: Login) {
        return this.authService.login(user).pipe(
            tap((result) => {
                patchState(result);
            }))
    }

    @Action(Logout)
    logout({ setState, getState }: StateContext<User>) {
        setState({});
    }
}
