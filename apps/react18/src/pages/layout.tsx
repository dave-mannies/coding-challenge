import {NavLink, Outlet} from 'react-router-dom';
import {IconButton} from '@mui/material';
import * as React from 'react';
import {Settings} from '@mui/icons-material';

export default function Layout() {
  const title = 'coding challenge: React 18';

  return (
    <div className="app-root react18">

      {/* Toolbar */}
      <div className="toolbar" role="banner">
        {/* Logo */}
        <img
          className="toolbar__logo spin"
          alt="React Logo"
          src="logo192.png"
        />

        {/* Menu */}
        <div className="toolbar__links">
          <div><NavLink to="tracking">Tracking</NavLink></div>
          <div><NavLink to="reports">Reports</NavLink></div>
          <div><NavLink to="history">History</NavLink></div>
        </div>

        <div className="toolbar__title">{title}</div>

        {/* Settings */}
        <IconButton
          className={'toolbar__inputs reverse-spin'}
          aria-label={'Settings'}
        >
          <Settings fontSize={'medium'} />
        </IconButton>
      </div>

      {/* Content */}
      <Outlet />
    </div>
  )
}
