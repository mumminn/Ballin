import { Routes, Route, Navigate } from 'react-router-dom';

import SignUpPage from './pages/SignUp/SignUpPage'
import LoginPage from 'pages/Login/LoginPage';
import CalendarPage from 'pages/Calendar/CalendarPage';

export const PATH = {
  root: '/',
  login: '/login',
  signup: '/signup',
  kakao: '/kakao',
  calendar: '/calendar'
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATH.root} element={<Navigate to={PATH.login} replace />} />
      <Route path={PATH.signup} element={<SignUpPage />} />
      <Route path={PATH.login} element={<LoginPage />} />
      <Route path={PATH.kakao} />
      <Route path={PATH.calendar} element={<CalendarPage />} />

      {/* 404 */}
      <Route path="*" element={<div className="p-6">404 페이지를 찾을 수 없습니다</div>} />
    </Routes>
  );
}