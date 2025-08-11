import { Routes, Route, Navigate } from 'react-router-dom';

import SignUpPage from './pages/SignUp/SignUpPage'

export const PATH = {
  root: '/',
  login: '/login',
  signup: '/signup',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATH.root} element={<Navigate to={PATH.signup} replace />} />
      <Route path={PATH.signup} element={<SignUpPage />} />
      {/* <Route path={PATH.login} element={<LoginPage />} /> */}

      {/* 404 */}
      <Route path="*" element={<div className="p-6">404 페이지를 찾을 수 없습니다</div>} />
    </Routes>
  );
}