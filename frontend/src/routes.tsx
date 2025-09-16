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
import RecordEditDetailPage from '@/pages/RecordEditDetail/RecordEditDetailPage';
import StatisticPage from '@/pages/Statistic/StatisticPage';
import MapPage from '@/pages/Map/MapPage';
import SettingPage from '@/pages/Setting/SettingPage';
import EditAccountPage from '@/pages/EditAccount/EditAccountPage';

export const PATH = {
  root: '/',
  login: '/login',
  signup: '/signup',
  kakao: '/auth/kakao',

  calendar: '/calendar',

  recordCreate: '/record/create',
  recordCreateSport: '/record/create/:sport?',
  record: '/record',
  recordDetail: '/record/:category/:recordId',
  recordEdit: '/record/:category/:recordId/edit',

  statistic: '/statistic',

  map: '/map',

  setting: '/settings',
  editAccount: '/settings/edit',

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
        <Route path={PATH.recordEdit} element={<RecordEditDetailPage />} />
        <Route path={PATH.statistic} element={<StatisticPage />} />
        <Route path={PATH.map} element={<MapPage />} />
      </Route>

      <Route path={PATH.setting} element={<SettingPage />} />
      <Route path={PATH.editAccount} element={<EditAccountPage />} />


      {/* 404 */}
      <Route path="*" element={<div className="p-6">404 페이지를 찾을 수 없습니다</div>} />
    </Routes>
  );
}