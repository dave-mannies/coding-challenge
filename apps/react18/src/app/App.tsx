import {createContext} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Layout from '../pages/layout';
import PageTracking from '../pages/pageTracking';
import PageReports from '../pages/pageReports';
import PageHistory from '../pages/pageHistory';
import Error404 from '../pages/error404';
import {DeliveryService} from '../pizza-delivery/DeliveryService';

const deliveryService = new DeliveryService();
export const DeliveryContext = createContext({deliveryService});

export default function App() {
  return (
    <HashRouter>
      <DeliveryContext.Provider value={{deliveryService}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="tracking" element={<PageTracking />} />
            <Route path="reports" element={<PageReports />} />
            <Route path="history" element={<PageHistory />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </DeliveryContext.Provider>
    </HashRouter>
  );
}

