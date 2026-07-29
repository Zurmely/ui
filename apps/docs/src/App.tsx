import { BrowserRouter } from 'react-router-dom';
import { routerBasename } from './base-path';
import { ScrollToTop } from './layout/ScrollToTop';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
