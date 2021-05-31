import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// tslint:disable-next-line:ban-types
declare let gtag: Function;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-ganalytics',
  templateUrl: './ganalytics.component.html',
  styles: []
})
export class GanalyticsComponent implements OnInit {
  @Input() id!: string;
  @Input() debug = false;

  url = '';

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.addTagScript();
      this.tagRedirects();
    } else {
      console.log(`required google analytic id is undefined`);
    }
  }

  addTagScript(): void {
    if (this.id) {
      // https://www.rightpoint.com/rplabs/2020/09/ga-in-angular/
      // register google tag manager
      const tagScript = document.createElement('script');
      tagScript.async = true;
      tagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ this.id }`;
      document.head.appendChild(tagScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);

          if( ${ this.debug } ) {
            console.log(JSON.stringify(arguments));
          }
        }
        gtag('js', new Date());
        gtag('config', '${ this.id }');
      `;
      document.head.appendChild(gaScript);
    }
  }

  tagRedirects(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.urlAfterRedirects;
        gtag('config', this.id, { 'page_path': this.url });

        if (this.debug) {
          console.log(`tagRedirects ${ this.id }: ${ this.url }`);
        }
      }
    });
  }
}
