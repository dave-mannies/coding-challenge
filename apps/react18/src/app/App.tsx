import {createContext} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../pages/layout';
import Play from '../pages/play';
import Reports from '../pages/reports';
import History from '../pages/history';
import Error404 from '../pages/error404';
// import {DeliveryService} from '@repo/pizza-delivery/src/DeliveryService';
//
// const deliveryService = new DeliveryService();
export const DeliveryContext = createContext({hello: ''});

export default function App() {
  return (
    <BrowserRouter>
      <DeliveryContext.Provider value={{hello: 'world2'}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="play" element={<Play />} />
            <Route path="reports" element={<Reports />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </DeliveryContext.Provider>
    </BrowserRouter>
  );
}
