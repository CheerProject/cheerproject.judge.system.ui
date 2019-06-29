import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base-service';
import { MessageService } from '../../core/services/message.service';
import { Observable, of } from 'rxjs';
import { Division } from '../models/division';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class DashboardService extends BaseService {
  private dashboardUrl = 'api/divisions'; // URL to web api
  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  getDashBoard(): Observable<Division[]> {
    return this.http.get<Division[]>(this.dashboardUrl).pipe(
      tap( _ => this.log('Getting dashboard data')),
      map(divisions =>
        divisions.map(division => {
          const progress = (division.pending * 100) / division.teams;
          division.progress = progress;
          return division;
        })
      ),
      catchError(this.handleError('getDashboard', []))
    );
  }
}
