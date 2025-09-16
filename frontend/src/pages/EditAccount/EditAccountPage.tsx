import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditAccountForm } from "./EditAccountForm";

type Profile = {
  email: string;
  name: string;
  social_type: string;
};

async function getProfileMock(): Promise<Profile> {
  return Promise.resolve({
    email: "user@example.com",
    name: "홍길동",
    social_type: "kakao",
  });
}

export default function AccountEditPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [isKakao, setIsKakao] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // const profile = await getProfile();
        const profile = await getProfileMock();

        setEmail(profile.email ?? "");
        setName(profile.name ?? "");
        setIsKakao((profile.social_type ?? "").toLowerCase() === "kakao");
      } catch (e) {
        console.error(e);
        alert("프로필 정보를 불러오지 못했습니다.");
      }
    })();
  }, []);

  const onSubmit = async () => {
    if (isKakao) return;
    if (!email.trim() || !name.trim() || !currentPassword.trim() || !newPassword.trim()) {
      return alert("모든 항목을 입력해주세요.");
    }

    try {
      setSaving(true);
      // await updateAccount({ email, name, currentPassword, newPassword });

      console.log("account edit payload", { email, name, currentPassword, newPassword });
      alert("변경사항이 저장되었습니다.");
      navigate(-1);
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditAccountForm
      email={email}
      name={name}
      currentPassword={currentPassword}
      newPassword={newPassword}
      onChangeEmail={setEmail}
      onChangeName={setName}
      onChangeCurrentPassword={setCurrentPassword}
      onChangeNewPassword={setNewPassword}
      onSubmit={onSubmit}
      saving={saving}
      disabledAll={isKakao}
      noticeText={isKakao ? "카카오로 회원가입 된 계정입니다." : undefined}
    />
  );
}