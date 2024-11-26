import {NavLink, Outlet} from 'react-router-dom';
import {Card} from '@mui/material';
import * as React from 'react';

export default function Layout() {
  const title = 'coding challenge: React 18';

  return (
    <>
      <div className="app-root">

        {/* Toolbar */}
        <div className="toolbar" role="banner">
          <img
            className="toolbar__logo spin"
            alt="React Logo"
            src="logo192.png"
            height={40}
          />

          <div className="toolbar__links">
            <div><NavLink to="tracking">Tracking</NavLink></div>
            <div><NavLink to="reports">Reports</NavLink></div>
            <div><NavLink to="history">History</NavLink></div>
          </div>

          <div className="toolbar__title">{title}</div>

          {/*<app-inputs-modal class="toolbar__inputs"></app-inputs-modal>*/}
        </div>

        {/* Content */}
        <div className="content">
          <Card>
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  )
}
