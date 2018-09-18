import { SCORESHEETS } from './../../scoresheet/models/mock-scoresheet';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DIVISIONS } from '../../dashboard/models/mock-divisions';
import { REGISTRATIONS } from '../../registrations/models/mock-registrations';
import { User } from '../../auth/models/user';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const divisions = DIVISIONS;
    const registrations = REGISTRATIONS;
    const scoresheets = SCORESHEETS;
    const users: User[] = [{
      id: 1,
      email: 'eduardo@e.com',
      password: '1234',
      token:
        // tslint:disable-next-line:max-line-length
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImNvbnRlbnQtdHlwZSI6ImFwcGxpY2F0aW9uL2pzb24ifQ.eyJpZCI6IjEiLCJuYW1lIjoiRWR1YXJkbyBBdmlsZXMiLCJlbWFpbCI6ImVkdWFyZG9AbWFpbC5jb20ifQ.tC6aOCyBZwnmo5DcKGLtm4B1gXCX6oXUMKCjSHHxDO8`
    }];
    return { divisions, registrations, scoresheets, users };
  }
}
