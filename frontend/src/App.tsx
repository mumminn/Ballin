import { Layout } from '@/components/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import 'material-symbols';


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