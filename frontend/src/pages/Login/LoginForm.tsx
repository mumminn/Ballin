import { InputField } from "components/common/InputField";
import { PrimaryButton } from "components/common/PrimaryButton";
import { useState } from 'react';

interface LoginFormProps {
    email: string;
    password: string;

    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;

    onKakaoLogin: () => void;
    onSignUp: () => void;
}

export function LoginForm({
    email, password, onChangeEmail, onChangePassword, onKakaoLogin, onSignUp
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    return(
        <div className="w-full max-w-md px-6">
            {/* 로고 */}
            <div className="flex justify-center mt-16 mb-20">
                <img src="/images/logo.png" alt="ballin" className="w-60 h-60" /> 
            </div>

            {/* 이메일(id) */}
            <InputField
                label="ID(EMAIL)"
                type="email"
                containerClassName="mb-8"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEmail(e.target.value)}
            />

            {/* 비밀번호 */}
            <div className="relative">
                <InputField
                    label="PASSWORD"
                    type={showPassword? "text" : "password"}
                    value={password}                
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePassword(e.target.value)}
                    className="pr-10"
                />
                <img 
                    src={ showPassword ? "/images/icons/visibility_off.png" : "/images/icons/visibility.png" }
                    alt={ showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                    className="absolute right-7 top-[63px] -translate-y-1/2 cursor-pointer w-6 h-6"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                </img>
            </div>

            {/* 로그인 */}
            <PrimaryButton
                type="submit"
                className="mt-16"
                disabled={!(email && password)}
            >
                로그인
            </PrimaryButton>

            {/* 카카오 로그인 */}
            <div className="w-80 h-12 mx-auto mt-6">
                <img src='/images/kakao_login.png' 
                onClick={onKakaoLogin}
                >
                </img>
            </div>

            <p 
                className="mt-10 text-center text-base font-semibold text-gray-800 cursor-pointer hover:underline"
                onClick={onSignUp}
            >
                회원가입
            </p>


        </div>
    )
}