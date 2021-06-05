import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewport]'
})
export class ViewportDirective {

  constructor() {
    this.viewport();
  }

  viewport(): void {
    let mobile_timer = 0;
    let viewport = document.getElementById('viewport');

    if (navigator.userAgent.match(/iPhone/i) && viewport) {
      viewport.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');

      window.addEventListener('gesturestart', function () {
        clearTimeout(mobile_timer);
        viewport!.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=10.0');
      }, false);

      window.addEventListener('touchend', function () {
        clearTimeout(mobile_timer);
        mobile_timer = setTimeout(function () {
          viewport!.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');
        }, 1000);
      }, false);
    }

  }

}
