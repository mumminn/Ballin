import { LoginForm } from "./LoginForm";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('로그인 성공', {email, password});
        navigator('/calendar');
    }
    
    
    const onKakaoLogin = () => {
        // 카카오로그인 동의 페이지로 이동
        const KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
        // console.log(KakaoLoginAPI);
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