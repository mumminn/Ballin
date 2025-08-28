// src/pages/Calendar/CalendarPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarForm } from './CalendarForm';
import type { Tab, Stamp } from '@/types/calendar';
import { fetchStamps } from '@/api/calendar/stamp';
import { fetchCategories } from '@/api/calendar/category';
import type { Category } from '@/types/calendar';

const LS_TAB_KEY = 'calendar.selectedTab';

export default function CalendarPage() {
  const [tab, setTab] = useState<Tab>(() => {
    const saved = localStorage.getItem(LS_TAB_KEY) as Tab | null;
    return saved ?? 'all';
  });

  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [catMap, setCatMap] = useState<Record<string, string>>({});
  const [catsReady, setCatsReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(LS_TAB_KEY, tab);
  }, [tab]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const categories: Category[] = await fetchCategories();
        if (!alive) return;
        const map = Object.fromEntries(categories.map(c => [c.code, c.id]));
        setCatMap(map);
      } finally {
        if (alive) setCatsReady(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!catsReady) return;

    let alive = true;
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const categoryId = tab === 'all' ? undefined : catMap[tab];
        if (tab !== 'all' && !categoryId) {
          if (alive) setStamps([]);
          return;
        }
        const data = await fetchStamps(categoryId);
        if (!alive) return;
        setStamps(data);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? '불러오기 실패');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [tab, catsReady, catMap]);

  if (loading) return <div>로딩 중...</div>;
  if (err) return <div className="text-red-600">{err}</div>;

  return (
    <CalendarForm
      tab={tab}
      setTab={setTab}
      stamp={stamps}
      onRecord={() => navigate('/record/create')}
    />
  );
}