import { Division } from '../../models/division';

export class SetDivision {
    static readonly type = '[CurrentDivision] Set Current';
    constructor(public currentDivision: Division) { }
}
