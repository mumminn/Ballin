import { finishKakaoLogin } from "@/api/login/kakao";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function KakaoCallbackPage() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const ran = useRef(false);


    useEffect(() => {
        if (ran.current) return;
        ran.current = true;

        const code = params.get('code');
        if (!code) {
            navigate('/login', { replace: true });
            return;
        }

        (async () => {
            try{
                await finishKakaoLogin(code);
                navigate('/calendar', { replace: true });
            } catch {
                navigate('/login', { replace: true });
            }
        })();
    }, [navigate, params]);
    return <div>로그인 처리 중...</div>
}