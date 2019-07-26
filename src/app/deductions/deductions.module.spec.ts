import { DeductionsModule } from './deductions.module';

describe('DeductionsModule', () => {
  let deductionsModule: DeductionsModule;

  beforeEach(() => {
    deductionsModule = new DeductionsModule();
  });

  it('should create an instance', () => {
    expect(deductionsModule).toBeTruthy();
  });
});
