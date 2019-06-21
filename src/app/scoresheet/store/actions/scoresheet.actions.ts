import { ScoresheetModel } from '../../models/scoresheet-model';

export class AddScoresheet {
    static readonly type = '[Scoresheet] Add';
    constructor(public scoresheet: ScoresheetModel) { }
}

export class SaveScoresheet {
    static readonly type = '[Scoresheet] Save';
    constructor(public scoresheet: ScoresheetModel) { }
}


export class GetScoresheet {
    static readonly type = '[Scoresheet] Get all';
    constructor(public registrationId: number) { }
}
