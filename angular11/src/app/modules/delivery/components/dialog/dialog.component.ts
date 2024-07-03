import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { ControlContainer, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

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
