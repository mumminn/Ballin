import { useState } from 'react';
import { SignUpForm } from './SingUpForm';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'components/layout/Layout';
// import { signUp } from '@/api/users';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    
  const navigate = useNavigate();

  const onSendCode = async () => {
    try {
      setSending(true);
      // TODO: 실제 API (ex. POST /api/auth/email-code)
      await new Promise(r => setTimeout(r, 600));
      alert('인증번호 전송 완료');
    } finally {
      setSending(false);
    }
  };

  const onVerifyCode = async () => {
    try {
      setVerifying(true);
      // TODO: 실제 API (ex. POST /api/auth/verify-code)
      await new Promise(r => setTimeout(r, 500));
      setVerified(true);
      alert('이메일 인증 완료');
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
      <Layout>
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
        />
      </Layout>
        
  );
}