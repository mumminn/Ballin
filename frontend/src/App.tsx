import { Layout } from '../src/components/layout/Layout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrimaryButton } from './components/common/PrimaryButton';
import { InputField } from './components/common/InputField'


// import SingUpPage from './pages/Signup/SignUpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          {/* <Route path="/signup" element={<SingUpPage />} /> */}
          {/* <Route path="*" element={<div className="p-6">404</div>} /> */}
        </Routes>
        <section className="p-6">
          <PrimaryButton children="버튼이에요"/>
          <InputField label="ID(EMAIL)"/>
          {/* 여기에 실제 화면 내용 */}
        </section>
      </Layout>
    </BrowserRouter>
  );
}
