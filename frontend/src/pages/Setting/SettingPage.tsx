import { SettingFrom } from "./SettingForm";
import { useNavigate } from "react-router-dom";

export default function SettingPage() {

    const navigator = useNavigate();
    const handleEditAccount = () => {
        navigator("./edit")
    }

    const handleLogout = () => {

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