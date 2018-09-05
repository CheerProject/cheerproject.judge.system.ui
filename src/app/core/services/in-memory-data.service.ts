import { Division } from './../../dashboard/models/division';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DIVISIONS } from '../../dashboard/models/mock-divisions';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { DIVISIONS };
  }
}
