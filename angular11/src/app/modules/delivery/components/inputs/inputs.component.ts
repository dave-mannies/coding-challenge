import { Component, OnInit } from '@angular/core';
import { DeliveryService, Inputs } from "../../services";

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styles: [
  ]
})
export class InputsComponent implements OnInit {
  DELIVEREES = DeliveryService.DELIVEREES;
  DISPATCHES = DeliveryService.DISPATCHES;

  inputs!: Inputs;

  constructor(public dservice: DeliveryService) {
    this.inputs = dservice.inputs;
  }

  ngOnInit(): void {
  }

  getResults(): void {
    const res = this.dservice.getDeliveryResults();
    this.dservice.addResults(res);
  }
}
