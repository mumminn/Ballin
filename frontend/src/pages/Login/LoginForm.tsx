import { InputField } from "@/components/common/InputField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useState } from "react";

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

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-6">
      {/* 로고 */}
      <div className="flex justify-center mt-12 sm:mt-16 mb-10 sm:mb-20">
        <img
          src="/images/logo.png"
          alt="ballin"
          className="w-32 sm:w-60 h-auto"
        />
      </div>

      {/* 이메일 */}
      <InputField
        label="ID(EMAIL)"
        type="email"
        containerClassName="mb-6 sm:mb-8"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEmail(e.target.value)}
      />

      {/* 비밀번호 */}
      <div className="relative">
        <InputField
          label="PASSWORD"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePassword(e.target.value)}
          className="pr-12" // 아이콘 자리 확보
        />

        <button
          type="button"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-4 sm:right-7 top-[58px] sm:top-[63px] -translate-y-1/2 w-6 h-6 grid place-items-center"
        >
          <img
            src={showPassword ? "/images/icons/visibility_off.png" : "/images/icons/visibility.png"}
            alt=""
            className="w-5 sm:w-6 h-5 sm:h-6 pointer-events-none select-none"
            draggable={false}
          />
        </button>
      </div>

      {/* 로그인 버튼 */}
      <PrimaryButton
        type="submit"
        className="mt-10 sm:mt-16 w-full"
        disabled={!(email && password)}
      >
        로그인
      </PrimaryButton>

      {/* 카카오 로그인 */}
      <button
        type="button"
        onClick={onKakaoLogin}
        className="w-full h-12 mt-4 sm:mt-6"
        aria-label="카카오로 로그인"
      >
        <img
          src="/images/kakao_login.png"
          alt="카카오 로그인"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </button>

      <p
        className="mt-5 sm:mt-8 text-center text-sm sm:text-base font-semibold text-gray-800 cursor-pointer hover:underline"
        onClick={onSignUp}
      >
        회원가입
      </p>
    </div>
  );
}