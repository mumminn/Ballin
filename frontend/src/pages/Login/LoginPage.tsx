import axios from 'axios';
import { LoginForm } from "./LoginForm";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "@/api/login/login";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await login({email, password});
            navigator('/calendar', { replace: true });

        } catch (err) {
            const msg = axios.isAxiosError(err)
            ? (err.response?.data as any)?.message ?? '로그인 실패'
            : (err instanceof Error ? err.message : '로그인 실패');
          alert(msg);
        }
    }
    
    
    const onKakaoLogin = () => {
        // 카카오로그인 동의 페이지로 이동
        const KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
        window.location.href = KakaoLoginAPI;
    }

    const onSignUp = () => {
        navigator('/signup');
    }

    return (
        <form onSubmit={handleSubmit}>
            <LoginForm 
                email={email}
                password={password}
                onChangeEmail={setEmail}
                onChangePassword={setPassword}
                onKakaoLogin={onKakaoLogin}
                onSignUp={onSignUp}
            />
        </form>
    )
}