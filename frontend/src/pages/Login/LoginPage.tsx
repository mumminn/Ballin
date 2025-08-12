'use client';
import { LoginForm } from "./LoginForm";
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    const handleSubmit = async () => {
        console.log('로그인 성공');
        // navigator('/calendar');
    }

    return (
        <LoginForm 
            email={email}
            password={password}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
        />
    )
}