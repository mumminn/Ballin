import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { LabeledButton } from "@/components/common/LabeledButton";

interface SettingFromProps {
    editAccount: () => void,
    logout: () => void,
    deleteAccount: () => void,
}

export function SettingFrom({
    editAccount,
    logout,
    deleteAccount,
  }: SettingFromProps) {
    return (
      <SubLayout
        header={
          <div className="flex items-center justify-between w-full">
            <p className="text-2xl">설정</p>
          </div>
        }
        footer={<NavigationBar />}
        barHeight={56}
        maxWidth={480}
      >
        
        <div className="mt-6 grid grid-cols-1 sm:grid-raws-3 gap-5">
          <LabeledButton
            type="button"
            onClick={editAccount}
            className="w-full cursor-pointer text-left text-gray-500"
          >
            회원 정보 수정
          </LabeledButton>
  
          <LabeledButton
            type="button"
            onClick={logout}
            className="w-full cursor-pointer text-left text-gray-500"
          >
            로그아웃
          </LabeledButton>
  
          <LabeledButton
            type="button"
            onClick={deleteAccount}
            className="w-full cursor-pointer text-left text-gray-500"
          >
            회원 탈퇴
          </LabeledButton>
        </div>
      </SubLayout>
    );
  }