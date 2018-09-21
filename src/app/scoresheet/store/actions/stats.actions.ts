import { Stat } from "../../models/stat";

export class StatsModel {
    registrationId: number;
    stats: Stat[];
}

export class AddStats {
    static readonly type = '[Stats] Add Stat';
    constructor(public stats: StatsModel) { }
}

export class SetStat {
    static readonly type = '[Stats] SetStat';
    constructor(public stats: StatsModel) { }
}