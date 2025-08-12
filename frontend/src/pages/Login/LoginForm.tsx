import { InputField } from "components/common/InputField";
import { PrimaryButton } from "components/common/PrimaryButton";

interface LoginFormProps {
    email: string;
    password: string;

    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;
}

export function LoginForm({
    email, password, onChangeEmail, onChangePassword
}: LoginFormProps) {
    return(
        <div className="w-full max-w-md px-6">
            {/* 로고 */}
            <div className="flex justify-center mt-20 mb-20">
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
            <InputField
                label="PASSWORD"
                type="password"
                value={password}                
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePassword(e.target.value)}
            />

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
                <img src='/images/kakao_login.png'></img>
            </div>

            <p className="mt-10 text-center text-base font-semibold text-gray-800 cursor-pointer hover:underline">
                회원가입
            </p>


        </div>
    )
}