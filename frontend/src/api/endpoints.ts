const BASE_API ='/api'

export const ENDPOINTS = {
    KAKAO_LOGIN: `${BASE_API}/kakao/callback`,
    REFRESH_TOKEN: `${BASE_API}/auth/refresh`,

    CALENDAR_CATEGORY: `${BASE_API}/calendar/category`,
    CALENDAR_STAMP: `${BASE_API}/calendar/stamps`,
    CALENDAR_STAMP_CATE: (categoryId: string) => `${BASE_API}/calendar/stamps/${categoryId}`,

    RECORD_TEAM:  (categoryName: string) => `${BASE_API}/record/${categoryName}/teams`,
    RECORD: `${BASE_API}/record`,
    RECORD_DETAIl:  (recordId: string) => `${BASE_API}/record/${recordId}/detail`,
    RECORD_IMAGE:  (recordId: string) => `${BASE_API}/record/${recordId}/image`,
    RECORD_DELETE:  (recordId: string) => `${BASE_API}/record/${recordId}`,

    STATISTIC_SEASON: `${BASE_API}/statistic/season`,
    STATISTIC: `${BASE_API}/statistic`,
    
}