const BASE_API ='/api'

export const ENDPOINTS = {
    KAKAO_LOGIN: `${BASE_API}/kakao/callback`,
    REFRESH_TOKEN: `${BASE_API}/auth/refresh`,

    CALENDAR_CATEGORY: `${BASE_API}/calendar/category`,
    CALENDAR_STAMP: `${BASE_API}/calendar/stamps`,
    CALENDAR_STAMP_CATE: (categoryId: string) => `${BASE_API}/calendar/stamps/${categoryId}`,
    
}