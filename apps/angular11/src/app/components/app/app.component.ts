import { Component } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  id = environment.gaId;
  title = 'coding challenge: Angular 11 => 18';
}
