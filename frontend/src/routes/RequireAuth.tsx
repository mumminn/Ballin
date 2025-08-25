import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { setAccessToken, getAccessToken } from '@/api/client';

export default function RequireAuth() {
  const [checking, setChecking] = useState(true);
  const tried = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (tried.current) return;
    tried.current = true;

    (async () => {
      if (getAccessToken()) {
        setChecking(false);
        return;
      }

      try {
        const res = await axios.post('/api/auth/refresh', null, { withCredentials: true });
        const auth = res.headers['authorization'] as string | undefined;
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
        if (!token) throw new Error('No access token in headers');
        setAccessToken(token);
        setChecking(false);
      } catch {
        
        navigate('/login', { replace: true, state: { from: location.pathname } });
      }
    })();
  }, [navigate, location]);

  if (checking) {
    return <div className="p-6 text-sm text-gray-500">인증 확인 중…</div>;
  }
  return <Outlet />;
}