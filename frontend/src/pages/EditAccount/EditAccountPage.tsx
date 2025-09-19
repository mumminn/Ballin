import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditAccountForm } from "./EditAccountForm";
import { send } from "@/api/singup/sendMail";
import { verify } from "@/api/singup/verifyMail";
import { getUser } from "@/api/setting/getUser";
import { edit } from "@/api/setting/edit";
import { editPassword } from "@/api/setting/editPassword";
import axios from "axios";

type Profile = { email: string; name: string; socialType?: string };

export default function AccountEditPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
 
  const [initial, setInitial] = useState<{ email: string; name: string }>({ email: "", name: "" });

  const [saving, setSaving] = useState(false);
  const [isKakao, setIsKakao] = useState(false);

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const [showTimer, setShowTimer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

  const getErrMsg = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as { message?: string } | string | undefined;
      if (typeof data === "string") return data;
      return data?.message ?? err.message;
    }
    return (err as Error)?.message ?? "정보 변경 실패";
  }

  useEffect(() => {
    (async () => {
      try {
        const profile: Profile = await getUser();
  
        const kakao =
          (profile.socialType ?? "")
            .toString()
            .toLowerCase() === "kakao";
  
        setIsKakao(kakao);
  
        setInitial({ email: profile.email ?? "", name: profile.name ?? "" });

        if (kakao) {
          setEmail("");
          setName("");
        } else {
          setEmail(profile.email ?? "");
          setName(profile.name ?? "");
        }
      } catch (e) {
        console.error(e);
        alert("프로필 정보를 불러오지 못했습니다.");
      }
    })();
  }, []);

  // 변경 여부 계산
  const emailChanged = useMemo(
    () => email.trim().toLowerCase() !== initial.email.trim().toLowerCase(),
    [email, initial.email]
  );
  const nameChanged = useMemo(
    () => name.trim() !== initial.name.trim(),
    [name, initial.name]
  );
  const passwordChanged = useMemo(
    () => !!currentPassword.trim() && !!newPassword.trim() && currentPassword !== newPassword,
    [currentPassword, newPassword]
  );


  const profileCanSubmit =
  (emailChanged || nameChanged) &&
  (!emailChanged || verified) && 
  (!emailChanged || !!email.trim()) &&
  (!nameChanged || !!name.trim());    

  const canSubmit = !isKakao && (profileCanSubmit || passwordChanged);

  useEffect(() => {
    if (emailChanged) {
      setVerified(false);
      setCode("");
      setShowTimer(false);
      setSecondsLeft(0);
    }
  }, [emailChanged]);

  const onSendCode = async () => {
    if (!email) return;
    try {
      setSending(true);
      await send({ email });
      setSecondsLeft(180);
      setShowTimer(true);
      alert("인증번호 전송 완료");
    } finally {
      setSending(false);
    }
  };

  const onResendCode = async () => {
    await send({ email });
    setSecondsLeft(180);
  };

  useEffect(() => {
    if (!showTimer || verified || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [showTimer, secondsLeft, verified]);


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

    if (emailChanged && !verified) {
      alert("이메일 변경 시 인증이 필요합니다. 인증을 완료해주세요.");
      return;
    }

    const patch: Partial<Pick<Profile, "email" | "name">> = {};
    if (emailChanged) patch.email = email.trim();
    if (nameChanged) patch.name = name.trim();

    if (!emailChanged && !nameChanged && !passwordChanged) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      setSaving(true);

      
      if (emailChanged || nameChanged) {
        try {
          await edit(patch);
          setInitial((p) => ({ email: patch.email ?? p.email, name: patch.name ?? p.name }));
        } catch (e) {
          alert(getErrMsg(e));
          return;
        }
      }

      if (passwordChanged) {
        try {
          await editPassword({ currentPassword, newPassword });
          setCurrentPassword("");
          setNewPassword("");
        } catch (e) {
          alert(getErrMsg(e));
          return;
        }
      }

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
      canSubmit={canSubmit}
      needsEmailVerify={emailChanged}
      disabledAll={isKakao}
      noticeText={isKakao ? "카카오로 회원가입 된 계정입니다." : undefined}
    />
  );
}