import { RegistrationView } from '../../models/registration-view';
import { State, Action, StateContext } from '@ngxs/store';
import {
  GetRegistrations,
  RemoveOntime,
  RemovePending,
  AddOntime,
  AddPending,
  AddCompleted
} from '../actions/registration.actions';
import { RegistrationsService } from '../../services/registrations.service';
import { tap } from 'rxjs/operators';

export class RegistrationModel {
  registrations: RegistrationView;
}

@State<RegistrationModel>({
  name: 'registrations',
  defaults: {
    registrations: {
      completed: [],
      pending: [],
      ontime: []
    }
  }
})
export class RegistrationState {
  constructor(private registrationsService: RegistrationsService) {}

  @Action(GetRegistrations)
  getRegistrations({ getState, patchState }: StateContext<RegistrationModel>) {
    const state = getState();
    if (this.isEmpty(state.registrations)) {
      return this.registrationsService.getRegistrations().pipe(
        tap(result => {
          patchState({ registrations: result });
        })
      );
    }
  }

  @Action(AddOntime)
  addOntime(
    { getState, patchState, dispatch }: StateContext<RegistrationModel>,
    { registration }: AddOntime
  ) {
    const state = getState();
    patchState({
      registrations: {
        ontime: [...state.registrations.ontime, registration],
        pending: state.registrations.pending,
        completed: state.registrations.completed
      }
    });
    return dispatch(new RemovePending(registration));
  }

  @Action(AddPending)
  addPending(
    { getState, patchState, dispatch }: StateContext<RegistrationModel>,
    { registration }: AddOntime
  ) {
    const state = getState();
    patchState({
      registrations: {
        ontime: state.registrations.ontime,
        pending: [...state.registrations.pending, registration],
        completed: state.registrations.completed
      }
    });
    return dispatch(new RemoveOntime(registration));
  }

  @Action(RemoveOntime)
  removeOntime(
    { getState, patchState }: StateContext<RegistrationModel>,
    { registration }: RemoveOntime
  ) {
    const state = getState();
    const ontime = state.registrations.ontime.filter(r => r !== registration);
    patchState({
      registrations: {
        ontime: ontime,
        pending: state.registrations.pending,
        completed: state.registrations.completed
      }
    });
  }

  @Action(RemovePending)
  removePending(
    { getState, patchState }: StateContext<RegistrationModel>,
    { registration }: RemoveOntime
  ) {
    const state = getState();
    const pending = state.registrations.pending.filter(r => r !== registration);
    patchState({
      registrations: {
        ontime: state.registrations.ontime,
        pending: pending,
        completed: state.registrations.completed
      }
    });
  }

  isEmpty(registrations: RegistrationView) {
    // tslint:disable-next-line:no-debugger
    for (const item of Object.values(registrations)) {
      if (item.length > 0) {
        return false;
      }
    }

    return true;
  }

  @Action(AddCompleted)
  addCompleted(
    { getState, patchState, dispatch }: StateContext<RegistrationModel>,
    { registration }: AddCompleted
  ) {
    const state = getState();
    patchState({
      registrations: {
        ontime: state.registrations.ontime,
        pending: state.registrations.pending,
        completed: [...state.registrations.completed, registration]
      }
    });
    return dispatch(new RemoveOntime(registration));
  }
}
