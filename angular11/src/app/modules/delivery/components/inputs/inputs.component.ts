import { Component, OnInit } from '@angular/core';
import { DeliveryService, Inputs } from '../../services';

export enum ModeEnum {
  Enter,
  Select,
  File
}

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styles: []
})
export class InputsComponent implements OnInit {
  DELIVEREES = DeliveryService.DELIVEREES;
  DISPATCHES = DeliveryService.DISPATCHES;

  inputs!: Inputs;

  modeEnum = ModeEnum;
  selectedMode = ModeEnum.Enter;

  constructor(public dservice: DeliveryService) {
    this.inputs = dservice.inputs;
  }

  ngOnInit(): void {
  }

  getFile(ev: Event): void {
    let el = ev.target as HTMLInputElement;
    if (el && el.files) {
      let file = el.files[0];

      let fileReader = new FileReader();

      fileReader.onload = (e) => {
        this.inputs.dispatch = fileReader.result?.toString() || '';
      }

      fileReader.onerror = (e) => {
        console.error(`error reading file ${ fileReader.error }`);
      }

      fileReader.onabort = (e) => {
        console.error(`error aborted reading file`);
      }

      fileReader.readAsText(file);
    }
  }

  getResults(): void {
    const res = this.dservice.getDeliveryResults();
    this.dservice.addResults(res);
  }
}
