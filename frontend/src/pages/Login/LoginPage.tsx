'use client';
import { LoginForm } from "./LoginForm";
import { useEffect, useState} from 'react';
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
        navigator('/kakao');
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