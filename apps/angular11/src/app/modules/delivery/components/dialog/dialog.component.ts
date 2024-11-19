import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DialogComponent<T> implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      template: TemplateRef<any>;
      context: T;
    }
  ) {}

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.dialogRef.close(true);
  }
}
