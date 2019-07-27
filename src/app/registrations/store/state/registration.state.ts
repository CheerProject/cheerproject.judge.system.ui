
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
    GetRegistrations, UpdateRegistration, PendingRegistration, OnTimeRegistration, CompletedRegistration
} from '../actions/registration.actions';
import { RegistrationsService } from '../../services/registrations.service';
import { tap } from 'rxjs/operators';
import { Registration } from '../../models/registration';
import { RegistrationStatus } from '../../enums/registration-status.enum';

export class RegistrationModel {
    registrations: Registration[];
}

@State<RegistrationModel>({
    name: 'registrations',
    defaults: {
        registrations: []
    }
})
export class RegistrationState {
    constructor(private registrationsService: RegistrationsService) { }

    @Action(GetRegistrations)
    getRegistrations({ getState, setState }: StateContext<RegistrationModel>) {
        const state = getState();

        if (!state.registrations || state.registrations.length === 0) {
            return this.registrationsService.getRegistrations().pipe(
                tap(result => {
                    setState({ ...state, registrations: result });
                })
            );
        }
    }

    @Action(UpdateRegistration)
    updateRegistrations({ getState, setState }: StateContext<RegistrationModel>,
        { registration }: UpdateRegistration) {
        const state = getState();
        const registrations = state.registrations;
        registrations.forEach((reg) => {
            if (reg.id === registration.id) {
                reg = registration;
            }
        });
        setState({ ...state, registrations: registrations });
    }

    @Action(PendingRegistration)
    pendingRegistrations({ getState, setState }: StateContext<RegistrationModel>,
        { registration }: PendingRegistration) {
        const state = getState();
        const registrations = state.registrations;
        registrations.forEach((reg) => {
            if (reg.id === registration.id) {
                reg.status.name = RegistrationStatus.Pending;
            }
        });
        setState({ ...state, registrations: registrations });
    }

    @Action(OnTimeRegistration)
    onTimeRegistrations({ getState, setState }: StateContext<RegistrationModel>,
        { registration }: OnTimeRegistration) {
        const state = getState();
        const registrations = state.registrations;
        registrations.forEach((reg) => {
            if (reg.id === registration.id) {
                reg.status.name = RegistrationStatus.OnTime;
            }
        });
        setState({ ...state, registrations: registrations });
    }

    @Action(CompletedRegistration)
    completedRegistrations({ getState, setState }: StateContext<RegistrationModel>,
        { registration }: CompletedRegistration) {
        const state = getState();
        const registrations = state.registrations;
        registrations.forEach((reg) => {
            if (reg.id === registration.id) {
                reg.status.name = RegistrationStatus.Finished;
            }
        });
        setState({ ...state, registrations: registrations });
    }

}
