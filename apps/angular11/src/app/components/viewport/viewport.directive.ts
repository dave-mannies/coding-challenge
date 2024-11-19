import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewport]'
})
export class ViewportDirective {

  constructor() {
    this.viewport();
  }

  // from https://www.ternstyle.us/blog/reset-iphone-zoom-on-orientation-change-to-landscape
  viewport(): void {
    let mobileTimer: any = 0;
    const viewport = document.getElementById('viewport');

    if (navigator.userAgent.match(/iPhone/i) && viewport) {
      viewport.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');

      window.addEventListener('gesturestart', () => {
        clearTimeout(mobileTimer);
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=10.0');
        }
      }, false);

      window.addEventListener('touchend', () => {
        clearTimeout(mobileTimer);
        mobileTimer = setTimeout(() => {
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0');
          }
        }, 1000);
      }, false);
    }

  }
}
