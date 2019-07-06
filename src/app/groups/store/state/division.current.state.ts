import { State, Action, StateContext } from '@ngxs/store';
import { Division } from '../../models/division';
import { SetDivision } from '../actions/division.current.actions';

export class DivisionCurrentStateModel {
    currentDivision: Division;
}

@State<DivisionCurrentStateModel>({
    name: 'currentDivision',
    defaults: {
        currentDivision: new Division()
    }
})
export class DivisionCurrentState {

    @Action(SetDivision)
    set({ getState, setState }: StateContext<DivisionCurrentStateModel>, { currentDivision }: SetDivision) {

        const state = getState();

        setState({
            ...state,
            currentDivision: currentDivision
        });


    }
}
