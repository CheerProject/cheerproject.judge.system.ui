import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Array<string> = new Array<string>();

  constructor(public snackBar: MatSnackBar) {}

  add(message: string) {
    this.messages.push(message);
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }

  clear() {
    this.messages = [];
  }
}
