import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cheer app';

  constructor(private location: Location, private auth: AuthService) {
  }
  goBack(): void {
    this.location.back();
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthtenticated();
  }
}
