import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DeliveryService, Inputs } from "../../services";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-inputs-modal',
  templateUrl: './inputs-modal.component.html',
  styles: [
  ]
})
export class InputsModalComponent implements OnInit {
  @ViewChild('inputsTemplate') inputsTemplate!: TemplateRef<any>;

  inputs!: Inputs;

  constructor(
    public dservice: DeliveryService,
    public dialog: MatDialog
  ) {
    this.inputs = this.dservice.inputs;
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        template: this.inputsTemplate
      }
    });
  }
}
