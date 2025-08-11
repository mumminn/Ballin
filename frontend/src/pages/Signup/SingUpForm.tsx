import { InputField } from "components/common/InputField";
import { PrimaryButton } from "components/common/PrimaryButton";


type SignUpFormProps = {
    email: string;
    code: string;
    password: string;
    name: string;

    onChangeEmail: (email: string) => void;
    onChangeCode: (code: string) => void;
    onChangePassword: (password: string) => void;
    onChangeName: (name: string) => void;

    onSendCode: () => void;
    onResendCode: () => void;
    onVerifyCode: () => void;
    onSubmit: () => void;

    showTimer?: boolean;
    secondsLeft?: number;
    formatTime?: (sec:number)=>string;

    sending?: boolean;
    verifying?: boolean;
    verified?: boolean;
}

export function SignUpForm({
     email, code, password, name, 
     onChangeEmail, onChangeCode, onChangePassword, onChangeName,
     onSendCode, onResendCode, onVerifyCode, onSubmit, showTimer, secondsLeft, formatTime,
     sending, verifying, verified
    }: SignUpFormProps) {
        return (
            <form
              className="min-h-screen flex flex-col"
              onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            >
              <div className="grow">
                {/* 로고 */}
                <div className="flex flex-col items-center mt-6 mb-6">
                  <img src="/images/logo.png" alt="ballin" className="w-32 h-32" />
                </div>
        
                {/* 이메일 */}
                <InputField
                  containerClassName="mt-12"
                  label="ID(EMAIL)"
                  type="email"
                  value={email}
                  onChange={(e) => onChangeEmail(e.target.value)}
                />
        
                {/* 인증번호 전송 / 타이머 / 인증 완료 메세지 */}
                {(!showTimer || verified)? (
                    <PrimaryButton
                    type="button"
                    onClick={onSendCode}
                    disabled={!email || sending || verified}
                    primaryButtonClassName="mt-5"
                    >
                    인증번호 전송
                    </PrimaryButton>
                ) : (
                    <div className="w-80 mx-auto mt-5 flex items-center justify-between rounded-2xl bg-[#FFEDAD] px-5 py-3">
                    <span className="font-medium">{formatTime?.(secondsLeft ?? 0)}</span>
                    <button
                    type="button"
                    onClick={onResendCode}
                    className="font-semibold underline disabled:opacity-50"
                    disabled={sending}
                    >
                    재전송
                    </button>
                </div>
                )}
        
                {/* 인증 코드 입력 */}
                {!verified ? (
                <div className="flex w-80 mx-auto mt-5 gap-3">
                  <InputField
                    sizeVariant="half"
                    type="text"
                    value={code}
                    onChange={(e) => onChangeCode(e.target.value)}
                  />
                  <PrimaryButton
                    type="button"
                    sizeVariant="half"
                    onClick={onVerifyCode}
                    disabled={!code.trim() || verifying}
                  >
                    확인
                  </PrimaryButton>
                </div>
                ) : (
                    <div className="w-80 mx-auto mt-5 text-green-700 font-semibold">
                        인증되었습니다.
                    </div>
                )}
        
                {/* 비밀번호 */}
                <InputField
                  containerClassName="mt-8"
                  label="PASSWORD"
                  value={password}
                  onChange={(e) => onChangePassword(e.target.value)}
                />
        
                {/* 이름 */}
                <InputField
                  containerClassName="mt-8"
                  label="이름"
                  value={name}
                  onChange={(e) => onChangeName(e.target.value)}
                />
              </div>
        
              {/* 하단 버튼 */}
              <PrimaryButton
                type="button"
                onClick={onSubmit}
                disabled={!(verified && email.trim() && password.trim() && name.trim())}
                primaryButtonClassName="mt-auto mb-8"
              >
                회원가입
              </PrimaryButton>
            </form>
          );
  }