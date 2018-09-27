import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpHeaders } from '@angular/common/http';
import { CustomHerrorHandler } from '../errors/error-handler';
export class BaseService extends CustomHerrorHandler {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
