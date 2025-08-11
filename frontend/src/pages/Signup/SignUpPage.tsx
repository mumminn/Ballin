import { SignUpForm } from './SingUpForm';
// import { signUp } from '@/api/users';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();

//   const handleSignUp = async (data: { email: string; name: string; password: string }) => {
//     try {
//       await signUp(data); // API 호출
//       alert('회원가입 성공!');
//       navigate('/login');
//     } catch (error) {
//       console.error(error);
//       alert('회원가입 실패');
//     }
//   };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUpForm />
    </div>
  );
}