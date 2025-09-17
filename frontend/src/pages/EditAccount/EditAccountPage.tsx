import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditAccountForm } from "./EditAccountForm";
import { send } from "@/api/singup/sendMail";
import { verify } from "@/api/singup/verifyMail";

type Profile = {
  email: string;
  name: string;
  social_type: string;
};

async function getProfileMock(): Promise<Profile> {
  return Promise.resolve({
    email: "user@example.com",
    name: "홍길동",
    social_type: "local",
  });
}

export default function AccountEditPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState('');


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [isKakao, setIsKakao] = useState(false);

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  
  // 타이머 상태
  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const mmss = (sec: number) => {
      const m = Math.floor(sec / 60).toString();
      const s = (sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

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

  const onSendCode = async () => {
    if (!email) return;
    try {
      setSending(true);
      await send({email});
      setSecondsLeft(180);

      setShowTimer(true);

      alert('인증번호 전송 완료');
    } finally {
      setSending(false);
    }
  }

  const onResendCode = async () => {
    await send({email});
    setSecondsLeft(180); // 타이머 리셋
  };

      // 1초 간격 감소
      useEffect(() => {
        if (!showTimer || verified || secondsLeft <= 0) return;
        const id = setInterval(() => setSecondsLeft(s => s - 1), 1000);
        return () => clearInterval(id);
    }, [showTimer, secondsLeft, verified]);

    // 확인
    const onVerifyCode = async () => {
        try {
        setVerifying(true);
        await verify({ email, code });
        setVerified(true);
        setShowTimer(false);
        setSecondsLeft(0);
        } finally {
        setVerifying(false);
        }
    };

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
      code={code}
      name={name}
      currentPassword={currentPassword}
      newPassword={newPassword}
      onChangeEmail={setEmail}
      onChangeCode={setCode}
      onChangeName={setName}
      onSendCode={onSendCode}
      onVerifyCode={onVerifyCode}
      onChangeCurrentPassword={setCurrentPassword}
      onChangeNewPassword={setNewPassword}
      onSubmit={onSubmit}
      saving={saving}
      verifying={verifying}
      verified={verified}
      onResendCode={onResendCode}
      showTimer={showTimer}
      secondsLeft={secondsLeft}
      formatTime={mmss}
      disabledAll={isKakao}
      noticeText={isKakao ? "카카오로 회원가입 된 계정입니다." : undefined}
    />
  );
}