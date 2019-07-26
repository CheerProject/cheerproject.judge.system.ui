import { Component, Inject } from '@angular/core';

import { Stat } from '../../models/stat';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-scoresheet-dialog',
  templateUrl: 'scoresheet-dialog.template.html',
  styleUrls: ['./scoresheet.dialog.css']
})
export class ScoresheetDialogComponent {
  result: Stat[] = [];
  constructor(
    public dialogRef: MatDialogRef<ScoresheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stat[]
  ) {
    this.result = data;
  }

  save(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close();
  }
}
