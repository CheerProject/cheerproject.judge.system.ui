import { ScoresheetModule } from './scoresheet.module';

describe('ScoresheetModule', () => {
  let scoresheetModule: ScoresheetModule;

  beforeEach(() => {
    scoresheetModule = new ScoresheetModule();
  });

  it('should create an instance', () => {
    expect(scoresheetModule).toBeTruthy();
  });
});
