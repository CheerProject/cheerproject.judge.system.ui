import { SCORESHEETS } from './../../scoresheet/models/mock-scoresheet';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DIVISIONS } from '../../dashboard/models/mock-divisions';
import { REGISTRATIONS } from '../../registrations/models/mock-registrations';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const divisions = DIVISIONS;
    const registrations = REGISTRATIONS;
    const scoresheets = SCORESHEETS;
    return { divisions, registrations, scoresheets };
  }
}
