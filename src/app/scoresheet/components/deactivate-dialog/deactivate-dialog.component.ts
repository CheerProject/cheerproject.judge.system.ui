import { Component, OnInit, Inject } from '@angular/core';
import { Stat } from '../../models/stat';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScoresheetDialog } from '../dialogs/scoresheet.dialog';

@Component({
  selector: 'app-deactivate-dialog',
  templateUrl: './deactivate-dialog.component.html',
  styleUrls: ['./deactivate-dialog.component.css']
})
export class DeactivateDialogComponent {

  PENDING= 'PENDING';
  CANCEL = 'CANCEL';
  QUIT = 'QUIT'
  result: string;

  constructor(
    public dialogRef: MatDialogRef<ScoresheetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.result = data
  }

  pending(): void {
    this.dialogRef.close(this.PENDING);
  }

  close(): void {
    this.dialogRef.close(this.CANCEL);
  }

  quit(): void {
    this.dialogRef.close(this.QUIT);
  }
}
