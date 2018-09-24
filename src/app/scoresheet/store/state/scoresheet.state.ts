import { CustomHerrorHandler } from './../../../core/errors/error-handler';
import { MessageService } from './../../../core/services/message.service';
import { ScoresheetModel } from '../../models/scoresheet-model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ScoresheetService } from '../../services/scoresheet.service';

import { AddScoresheet, GetScoresheet } from '../actions/scoresheet.actions';
import { tap, catchError } from 'rxjs/operators';

export class ScoresheetsModel {
  scoresheets: ScoresheetModel[];
}

@State<ScoresheetsModel>({
  name: 'scoresheets',
  defaults: {
    scoresheets: []
  }
})
export class ScoresheetState extends CustomHerrorHandler {
  constructor(
    private scoresheetService: ScoresheetService,
    messageService: MessageService
  ) {
    super(messageService);
  }

  @Action(GetScoresheet)
  getScoresheets(
    { getState, patchState }: StateContext<ScoresheetsModel>,
    { registrationId }: GetScoresheet
  ) {
    const state = getState();
    const newState = state.scoresheets.find(
      ss => ss.registrationId === registrationId
    );
    if (!newState) {
      return this.scoresheetService.getScoresheet().pipe(
        tap(result => {
          result.registrationId = registrationId;
          const registrationState = state.scoresheets.filter(
            ss => ss.registrationId !== registrationId
          );
          patchState({
            scoresheets: [...registrationState, result]
          });
        }),
        catchError(this.handleError('getScoresheet', new ScoresheetModel()))
      );
    }
  }

  @Action(AddScoresheet, { cancelUncompleted: true })
  addScoresheet(
    { getState, patchState, dispatch }: StateContext<ScoresheetsModel>,
    { scoresheet }: AddScoresheet
  ) {
    const state = getState();
    return this.scoresheetService.saveScoresheet(scoresheet).pipe(
      tap(result => {
        console.log('saving scoresheet');
        const registrationId = scoresheet.registrationId;
        const newState = state.scoresheets.filter(
          ss => ss.registrationId !== registrationId
        );
        patchState({
          scoresheets: [...newState, scoresheet]
        });
      }),
      tap(() => this.log('Se guardo exitosamente')),
      catchError(this.handleError('Add scoresheet', false))
    );
  }
}
