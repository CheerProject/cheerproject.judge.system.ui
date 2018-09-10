import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { GetMapValuesPipe } from './pipes/get-map-values.pipe';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule
  ],
  declarations: [GetMapValuesPipe, MessagesComponent],
  exports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    GetMapValuesPipe,
    MessagesComponent
  ]
})
export class SharedModule {}
