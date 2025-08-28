import { api } from '@/api/client';
import { ApiResponse } from '@/types/api';
import { Category, CategoryApi, CategoriesResult } from '@/types/calendar';
import { CATEGORY_LABELS } from '@/constants/category';
import { ENDPOINTS } from '../endpoints';

const toCategory = (c: CategoryApi): Category => ({
  id: c.categoryId,
  code: c.categoryName,
  label: CATEGORY_LABELS[c.categoryName] ?? c.categoryName,
});

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<ApiResponse<CategoriesResult>>(ENDPOINTS.CALENDAR_CATEGORY);
  if (!data.isSuccess) throw new Error(data.message || '카테고리 조회 실패');
  return (data.result?.categories ?? []).map(toCategory);
}