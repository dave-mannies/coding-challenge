import * as React from 'react';
import { Card } from '@mui/material';

export default function App() {
  return (
    <div className="app-root">

      {/* Toolbar */ }
      <div className="toolbar" role="banner">
        <img
          className="toolbar__logo"
          alt="React Logo"
          src="logo.svg"
          height={'100%'}
        />

        <div className="toolbar__links">
          {/*<a mat-list-item routerLink="play" routerLinkActive="active">Tracking</a>*/}
          {/*<a mat-list-item routerLink="reports" routerLinkActive="active">Reports</a>*/}
          {/*<a mat-list-item routerLink="history" routerLinkActive="active">History</a>*/}
        </div>

        {/*<div class="toolbar__title">{{ title }}</div>*/}

        {/*<app-inputs-modal class="toolbar__inputs"></app-inputs-modal>*/}
      </div>

      {/* Content */ }
      <div className="content">
        <Card>
          hello
        </Card>
        {/*<mat-card>*/}
        {/*  <router-outlet></router-outlet>*/}
        {/*</mat-card>*/}
      </div>
    </div>
  );
}
