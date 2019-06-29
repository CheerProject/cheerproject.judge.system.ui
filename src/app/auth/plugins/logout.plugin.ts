import { RegistrationView } from './../../registrations/models/registration-view';
import { RegistrationModel } from './../../registrations/store/state/registration.state';
import { getActionTypeFromInstance } from '@ngxs/store';
import { Logout } from '../store/actions/auth.actions';

export function logoutPlugin(state, action, next) {
    // Use the get action type helper to determine the type
    if (getActionTypeFromInstance(action) === Logout.type) {
        // if we are a logout type, lets erase all the state

        state = {
            auth: {},
            divisions: { divisions: [] },
            registrations: { registrations: [] },
            stats: { stats: [] },
            scoresheets: { scoresheets: [] }
        };
    }

    // return the next function with the empty state
    return next(state, action);
}
