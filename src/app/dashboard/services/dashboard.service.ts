import { DIVISIONS } from './../models/mock-divisions';
import { DashboardModule } from './../dashboard.module';
import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base-service';
import { MessageService } from '../../core/services/message.service';
import { Observable, of } from 'rxjs';
import { Division } from '../models/division';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: DashboardModule
})
export class DashboardService extends BaseService {
  private dashboardUrl = 'api/division'; // URL to web api
  constructor(private http: HttpClient, messageService: MessageService) {
    super(messageService);
  }

  getDashBoard(): Observable<Division[]> {
    return this.http.get<Division[]>(this.dashboardUrl).pipe(
      tap(heroes => this.log('Getting dashboard data')),
      catchError(this.handleError('getDashboard', []))
    );
  }
}
