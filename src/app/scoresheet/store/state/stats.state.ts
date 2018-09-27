import { Stat } from '../../models/stat';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddStats, StatsModel } from '../actions/stats.actions';

export class RegistrationStatsModel {
  stats: StatsModel[];
}

@State<RegistrationStatsModel>({
  name: 'stats',
  defaults: {
    stats: []
  }
})
export class StatState {
  @Action(AddStats)
  addStats(
    { getState, patchState }: StateContext<RegistrationStatsModel>,
    { stats }: AddStats
  ) {
    const state = getState();

    const newState = state.stats.filter(
      s => s.registrationId !== stats.registrationId
    );
    patchState({
      stats: [...newState, stats]
    });
  }
}
