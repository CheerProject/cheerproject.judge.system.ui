import { Component, Inject } from '@angular/core';

import { Stat } from '../../models/stat';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-review-dialog',
  templateUrl: 'review-dialog.template.html',
  styleUrls: ['./review.dialog.css']
})
export class ReviewDialogComponent {
  result: Stat[] = [];
  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stat[]
  ) {
    this.result = data;
  }

}
