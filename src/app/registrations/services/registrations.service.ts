import { RegistrationView } from './../models/registration-view';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegistrationsModule } from '../registrations.module';
import { BaseService } from '../../core/services/base-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/services/message.service';
import { Registration } from '../models/registration';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { RegistrationStatus } from '../enums/registration-status.enum';

@Injectable({
  providedIn: RegistrationsModule
})
export class RegistrationsService extends BaseService {
  private registrationUrl = 'api/registrations';
  private response: RegistrationView;
  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  getRegistrations(): Observable< RegistrationView > {
    return this.http.get<Registration[]>(this.registrationUrl).pipe(
      tap(_ => this.log('Getting registrations data')),
      map((registrations: Registration[]) => {
        this.response = new RegistrationView();
        registrations.forEach(registration => {
          if (registration) {
            switch (registration.status.name) {
              case RegistrationStatus.OnTime:
              this.response.ontime.push(registration);
                break;
              case RegistrationStatus.Pending:
              this.response.pending.push(registration);
                break;
              case RegistrationStatus.Finished:
              this.response.completed.push(registration);
                break;
            }
          }
        });
        return this.response;
      }),
      catchError(this.handleError<RegistrationView>('getRegistrations', new RegistrationView()))
    );
  }
}
