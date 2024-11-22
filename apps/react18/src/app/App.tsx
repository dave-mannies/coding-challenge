import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../pages/layout';
import Play from '../pages/play';
import Reports from '../pages/reports';
import History from '../pages/history';
import Error404 from '../pages/error404';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="play" element={<Play />} />
          <Route path="reports" element={<Reports />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
