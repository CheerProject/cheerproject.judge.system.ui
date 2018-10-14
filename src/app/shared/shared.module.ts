import { MainWrapperComponent } from './components/main-wrapper/main-wrapper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { GetMapValuesPipe } from './pipes/get-map-values.pipe';
import { MessagesComponent } from './components/messages/messages.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [GetMapValuesPipe, MessagesComponent, MainWrapperComponent],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    GetMapValuesPipe,
    MessagesComponent,
    MatBadgeModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSidenavModule,
    MainWrapperComponent,
    MatListModule
  ]
})
export class SharedModule {}
