import { Routes, Route, Navigate } from 'react-router-dom';

import SignUpPage from '@/pages/Signup/SignUpPage';
import LoginPage from '@/pages/Login/LoginPage';
import CalendarPage from '@/pages/Calendar/CalendarPage';
import RecordCreatePage from '@/pages/RecordCreate/RecordCreatePage';
import RecordCreateDetailPage from '@/pages/RecordCreate/RecordCreateDetailPage';
import RecordPage from '@/pages/Record/RecordPage';
import RecordDetailPage from '@/pages/Record/RecordDetailPage';
import KakaoCallbackPage from '@/pages/Login/KakaoCallbackPage';
import RequireAuth from '@/routes/RequireAuth';


export const PATH = {
  root: '/',
  login: '/login',
  signup: '/signup',
  kakao: '/auth/kakao',
  calendar: '/calendar',
  recordCreate: '/record/create',
  recordCreateSport: '/record/create/:sport?',
  record: '/record',
  recordDetail: '/record/:recordId',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATH.root} element={<Navigate to={PATH.login} replace />} />
      <Route path={PATH.signup} element={<SignUpPage />} />
      <Route path={PATH.login} element={<LoginPage />} />
      <Route path={PATH.kakao} element={<KakaoCallbackPage />} />

      <Route element={<RequireAuth />}>
        <Route path={PATH.calendar} element={<CalendarPage />} />
        <Route path={PATH.recordCreate} element={<RecordCreatePage />} />
        <Route path={PATH.recordCreateSport} element={<RecordCreateDetailPage />} />
        <Route path={PATH.record} element={<RecordPage />} />
        <Route path={PATH.recordDetail} element={<RecordDetailPage />} />
      </Route>


      {/* 404 */}
      <Route path="*" element={<div className="p-6">404 페이지를 찾을 수 없습니다</div>} />
    </Routes>
  );
}