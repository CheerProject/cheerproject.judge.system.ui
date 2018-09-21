import { ScoresheetModel } from "../../models/scoresheet-model";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { ScoresheetService } from "../../services/scoresheet.service";

import { AddScoresheet, GetScoresheet } from "../actions/scoresheet.actions";
import { tap } from "rxjs/operators";

export class ScoresheetsModel {
    scoresheets: ScoresheetModel[];
}

@State<ScoresheetsModel>({
    name: 'scoresheets',
    defaults: {
        scoresheets: []
    }
})
export class ScoresheetState {
    constructor(private scoresheetService: ScoresheetService) { }


    @Action(GetScoresheet)
    getScoresheets(
        { getState, patchState }: StateContext<ScoresheetsModel>,
        { registrationId }: GetScoresheet
    ) {
        const state = getState();
        const newState = state.scoresheets.find(ss => ss.registrationId == registrationId)
        if (!newState) {

            return this.scoresheetService.getScoresheet()
                .pipe(
                    tap((result) => {
                        result.registrationId = registrationId;
                        const newState = state.scoresheets.filter(ss => ss.registrationId !== registrationId)
                        patchState({
                            scoresheets: [...newState, result]
                        })
                    })
                );
        }
    }


    @Action(AddScoresheet)
    addScoresheet(
        { getState, patchState, dispatch }: StateContext<ScoresheetsModel>,
        { scoresheet }: AddScoresheet
    ) {
        const state = getState();
        const registrationId = scoresheet.registrationId;
        const newState = state.scoresheets.filter(ss => ss.registrationId !== registrationId)
        patchState({
            scoresheets: [...newState, scoresheet]
        })
    }


}
