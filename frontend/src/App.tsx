import { Layout } from '../src/components/layout/Layout';
import { BrowserRouter } from 'react-router-dom';


import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}