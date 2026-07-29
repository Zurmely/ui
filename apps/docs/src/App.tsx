import { BrowserRouter } from 'react-router-dom';
import { routerBasename } from './base-path';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter basename={routerBasename()}>
      <AppRoutes />
    </BrowserRouter>
  );
}
