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
    onVerifyCode: () => void;
    onSubmit: () => void;

    sending?: boolean;
    verifying?: boolean;
    verified?: boolean;
}

export function SignUpForm({
     email, code, password, name, 
     onChangeEmail, onChangeCode, onChangePassword, onChangeName,
     onSendCode, onVerifyCode, onSubmit, 
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
        
                {/* 인증번호 전송 */}
                <PrimaryButton
                  type="button"
                  onClick={onSendCode}
                  disabled={!email || sending}
                  primaryButtonClassName="mt-5"
                >
                  인증번호 전송
                </PrimaryButton>
        
                {/* 인증 코드 입력 */}
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