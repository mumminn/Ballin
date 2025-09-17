import { InputField } from "@/components/common/InputField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";

import React from "react";

interface EditAccountFormProps {
  email: string;
  name: string;
  code: string;
  currentPassword: string;
  newPassword: string;

  onChangeEmail: (v: string) => void;
  onChangeName: (v: string) => void;
  onChangeCurrentPassword: (v: string) => void;
  onChangeNewPassword: (v: string) => void;

  onChangeCode: (code: string) => void;
  onSendCode: () => void;
  onResendCode: () => void;
  onVerifyCode: () => void;

  onSubmit: () => void;

  showTimer?: boolean;
  secondsLeft?: number;
  formatTime?: (sec:number)=>string;

  saving?: boolean;

  disabledAll?: boolean;

  noticeText?: string;

  sending?: boolean;
  verifying?: boolean;
  verified?: boolean;
}


export function EditAccountForm({
  email,
  name,
  code,
  currentPassword,
  newPassword,
  onChangeEmail,
  onChangeName,
  onChangeCode,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onSendCode,
  onResendCode,
  onVerifyCode,
  onSubmit,
  showTimer,
  secondsLeft,
  formatTime,
  saving,
  disabledAll = false,
  noticeText,
  sending,
  verifying,
  verified,
}: EditAccountFormProps) {
  const canSubmit =
    !disabledAll &&
    email.trim() !== "" &&
    name.trim() !== "" &&
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "";

  const Notice = () =>
    noticeText ? (
      <div className="w-80 mx-auto mt-4 mb-2 rounded-xl bg-yellow-100 px-4 py-3 text-sm font-medium text-yellow-800">
        {noticeText}
      </div>
    ) : null;

  return (

    <SubLayout
    header={
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl">회원 정보 수정</p>
      </div>
    }
    footer={<NavigationBar />}
    barHeight={56}
    maxWidth={480}
    >
        <form
        onSubmit={(e) => {
            e.preventDefault();
            if (!disabledAll) onSubmit();
        }}
        style={{ height: 'calc(100svh - 56px)' }}
        >
        <div className="grow">
            <Notice />

            <InputField
            containerClassName="mt-6"
            label="EMAIL"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeEmail(e.target.value)
            }
            disabled={disabledAll}
            />

                {(!showTimer || verified)? (
                    <PrimaryButton
                    type="button"
                    onClick={onSendCode}
                    disabled={!email || sending || verified}
                    className="mt-5"
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCode(e.target.value)}
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

            
            <InputField
                containerClassName="mt-6"
                type="password"
                label="Password"
                value={currentPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeCurrentPassword(e.target.value)
                }
                disabled={disabledAll}
                placeholder="이전 비밀번호"
            />
            <InputField
                containerClassName="mt-4"
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeNewPassword(e.target.value)
                }
                disabled={disabledAll}
                placeholder="새로운 비밀번호"
            />

            <InputField
            containerClassName="mt-6"
            label="이름"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeName(e.target.value)
            }
            disabled={disabledAll}
            />

        </div>

        <PrimaryButton
            type="submit"
            disabled={!canSubmit || saving || disabledAll}
            className="mt-15"
        >
            {disabledAll ? "수정 불가" : saving ? "저장 중..." : "변경 저장"}
        </PrimaryButton>
        </form>
    </SubLayout>
  );
}