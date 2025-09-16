import { InputField } from "@/components/common/InputField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";

import React from "react";

interface EditAccountFormProps {
  email: string;
  name: string;
  currentPassword: string;
  newPassword: string;

  onChangeEmail: (v: string) => void;
  onChangeName: (v: string) => void;
  onChangeCurrentPassword: (v: string) => void;
  onChangeNewPassword: (v: string) => void;

  onSubmit: () => void;

  saving?: boolean;

  disabledAll?: boolean;

  noticeText?: string;
}

export function EditAccountForm({
  email,
  name,
  currentPassword,
  newPassword,
  onChangeEmail,
  onChangeName,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onSubmit,
  saving,
  disabledAll = false,
  noticeText,
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