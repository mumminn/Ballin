import { SettingFrom } from "./SettingForm";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/setting/logout";
import { deleteUser } from "@/api/setting/\bdeleteUser";

export default function SettingPage() {
  const navigator = useNavigate();

  const handleEditAccount = () => {
    navigator("./edit");
  };

  const handleLogout = async () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (!ok) return;

    try {
      await logout();
      alert("로그아웃 되었습니다.");
      navigator("/login", { replace: true });
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.message ?? "로그아웃에 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {

    const ok = window.confirm("정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
    if (!ok) return;

    try {
      await deleteUser();
      alert("회원탈퇴가 완료되었습니다.");
      navigator("/login", { replace: true });
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.message ?? "회원탈퇴에 실패했습니다.");
    }
  };

  return (
    <SettingFrom
      editAccount={handleEditAccount}
      logout={handleLogout}
      deleteAccount={handleDeleteAccount}
    />
  );
}