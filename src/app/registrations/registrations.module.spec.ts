import { RegistrationsModule } from './registrations.module';

describe('RegistrationsModule', () => {
  let registrationsModule: RegistrationsModule;

  beforeEach(() => {
    registrationsModule = new RegistrationsModule();
  });

  it('should create an instance', () => {
    expect(registrationsModule).toBeTruthy();
  });
});
