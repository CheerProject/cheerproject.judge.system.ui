import { Status } from './status';
import { Championship } from './championship';
import { Team } from './team';
import { DivisionGroup } from './division-group';

export class Registration {
    id: number;
    divisionGroup: DivisionGroup;
    team: Team;
    championship: Championship;
    status: Status;
    points: number;
}
