import { SettingFrom } from "./SettingForm";
import { replace, useNavigate } from "react-router-dom";
import { logout } from "@/api/setting/logout";

export default function SettingPage() {

    const navigator = useNavigate();
    const handleEditAccount = () => {
        navigator("./edit")
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigator("/login", { replace: true});
        } catch (e) {
            console.error(e);
            alert("로그아웃에 실패했습니다.");
        }
    }

    const handleDeleteAccount = () => {

    }

    return (
        <SettingFrom
            editAccount={handleEditAccount}
            logout={handleLogout}
            deleteAccount={handleDeleteAccount}
        />
    )
}