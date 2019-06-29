import { RegistrationView } from './../models/registration-view';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../core/services/message.service';
import { Registration } from '../models/registration';
import { catchError, map, tap, switchMap, filter } from 'rxjs/operators';
import { RegistrationStatus } from '../enums/registration-status.enum';

@Injectable()
export class RegistrationsService extends BaseService {
    private registrationUrl = 'api/registrations';
    private response: RegistrationView;
    constructor(private http: HttpClient, messageService: MessageService) {
        super(messageService);
    }

    getRegistrations(): Observable<Registration[]> {
        return this.http.get<Registration[]>(this.registrationUrl).pipe(
            filter(reg => reg !== null),
            tap(_ => this.log('Getting registrations data')),
            catchError(this.handleError<Registration[]>('getRegistrations', []))
        );
    }
}
