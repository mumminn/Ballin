const BASE_API ='/api'

export const ENDPOINTS = {
    KAKAO_LOGIN: `${BASE_API}/kakao/callback`,
    REFRESH_TOKEN: `${BASE_API}/auth/refresh`,
    LOGIN: `${BASE_API}/auth/login`,
    LOGOUT: `${BASE_API}/auth/logout`,

    SIGNUP: `${BASE_API}/users/signup`,

    CALENDAR_CATEGORY: `${BASE_API}/calendar/category`,
    CALENDAR_STAMP: `${BASE_API}/calendar/stamps`,
    CALENDAR_STAMP_CATE: (categoryId: string) => `${BASE_API}/calendar/stamps/${categoryId}`,

    RECORD_TEAM:  (categoryName: string) => `${BASE_API}/record/${categoryName}/teams`,
    RECORD: `${BASE_API}/record`,
    RECORD_DETAIl:  (recordId: string) => `${BASE_API}/record/${recordId}/detail`,
    RECORD_IMAGE:  (recordId: string) => `${BASE_API}/record/${recordId}/image`,
    RECORD_DELETE:  (recordId: string) => `${BASE_API}/record/${recordId}`,
    RECORD_HIGHLIGHTS:  (recordId: string) => `${BASE_API}/highlights/${recordId}`,

    STATISTIC_SEASON: `${BASE_API}/statistic/season`,
    STATISTIC: `${BASE_API}/statistic`,

    MAP: `${BASE_API}/map`,
    USERS: `${BASE_API}/users`,
    EDIT: `${BASE_API}/users/edit`,
    EDIT_PASSWORD: `${BASE_API}/users/edit/password`,
    
    MAIL_SEND: `${BASE_API}/auth/mail/send`,
    MAIL_VERIFY: `${BASE_API}/auth/mail/verify`,
    
}