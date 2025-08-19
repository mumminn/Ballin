import { useEffect, useState } from 'react';
import { SignUpForm } from './SingUpForm';
import { useNavigate } from 'react-router-dom';
// import { signUp } from '@/api/users';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    
    // 타이머 상태
    const [showTimer, setShowTimer] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);

    const mmss = (sec: number) => {
        const m = Math.floor(sec / 60).toString();
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      };

    const navigate = useNavigate();

    const onSendCode = async () => {
        if (!email) return;
        try {
        setSending(true);
        // await api.sendCode(email);
        setSecondsLeft(180);

        setShowTimer(true);

        alert('인증번호 전송 완료');
        } finally {
        setSending(false);
        }
    };

    // 재전송
    const onResendCode = async () => {
        // await api.sendCode(email);
        setSecondsLeft(180); // 타이머 리셋
    };

    // 1초 간격 감소
    useEffect(() => {
        if (!showTimer || verified || secondsLeft <= 0) return;
        const id = setInterval(() => setSecondsLeft(s => s - 1), 1000);
        return () => clearInterval(id);
    }, [showTimer, secondsLeft, verified]);

    // 확인
    const onVerifyCode = async () => {
        try {
        setVerifying(true);
        // await api.verify({ email, code });
        setVerified(true);
        setShowTimer(false);   // 타이머/재전송 숨김
        setSecondsLeft(0);
        } finally {
        setVerifying(false);
        }
    };

  const onSubmit = async () => {
    if (!verified) return alert('이메일 인증을 먼저 완료해주세요.');
    try {
      // 실제 회원가입 API
      // await usersApi.signup({ email, name, password }); // POST /api/users
      console.log('signup payload', { email, name, password });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (e: any) {
      alert(e?.response?.data?.message ?? '회원가입 실패');
    }
  };

  return (
        <SignUpForm  
            email={email}
            code={code}
            password={password}
            name={name}
            onChangeEmail={setEmail}
            onChangeCode={setCode}
            onChangePassword={setPassword}
            onChangeName={setName}
            onSendCode={onSendCode}
            onVerifyCode={onVerifyCode}
            onSubmit={onSubmit}
            sending={sending}
            verifying={verifying}
            verified={verified}
            onResendCode={onResendCode}
            showTimer={showTimer}
            secondsLeft={secondsLeft}
            formatTime={mmss}
        />
  );
}