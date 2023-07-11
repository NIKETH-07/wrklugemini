import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
  <h2 mat-dialog-title>{{ data.success ? 'Success' : 'Error' }}</h2>
  <mat-dialog-content *ngIf="!data.success" class="message">{{ data.message }}</mat-dialog-content>
  <mat-dialog-content *ngIf="data.success" class="success-message">{{ data.successMessage }}</mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close color="primary">OK</button>
  </mat-dialog-actions>
`,
styles: [
  `
  .success-message {
    color: green;
    font-weight: bold;
  }

  .message {
    color: red;
    font-weight: bold;
  }
  `
] 
   
  
})
export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, success: boolean, successMessage: string }) { }
}
