import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Division } from '../../models/division';
import { GetDivision } from '../actions/dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';
import { tap } from 'rxjs/operators';

export class DivisionStateModel {
    divisions: Division[];
}

@State<DivisionStateModel>({
    name: 'divisions',
    defaults: {
        divisions: []
    }
})

export class DivisionState {

    constructor(private dashboardService: DashboardService) { }

    @Selector()
    static divisions(state: DivisionStateModel) {
        return state.divisions;
    }

    @Action(GetDivision)
    get({ getState, setState }: StateContext<DivisionStateModel>) {
        const state = getState();

        if (state.divisions.length > 0) {
            console.log('getting from cache');
        } else {
            return this.dashboardService.getDashBoard().pipe(
                tap((result) => {
                    setState({
                        ...state,
                        divisions: result
                    })
                })
            )

        }


    }
}