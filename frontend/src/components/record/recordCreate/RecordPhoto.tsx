// components/record/recordCreate/RecordPhoto.tsx
import * as React from "react";


interface RecordPhotoProps {
  value?: File | string | null;         
  onChange?: (file: File | null) => void;
  accept?: string;
  containerClassName?: string; 
  boxClassName?: string;
  disabled?: boolean;
  showPreview?: boolean;
}

export function RecordPhoto({
  value,
  onChange,
  accept = "image/*",
  containerClassName,
  disabled,
  showPreview = true,
}: RecordPhotoProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [blobUrl, setBlobUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!value) {
      setBlobUrl(null);
      return;
    }
    if (typeof value === "string"){
      setBlobUrl(value);
      return;
    }
    const url = URL.createObjectURL(value); // blob일 경우 로컬 객체 url 생성
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };
  
  const pushFile = (file?: File) => {
    if(!onChange || !file) return;
    if(!file.type.startsWith("image/"))return;
    onChange(file);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    pushFile(file);
    e.currentTarget.value = "";
  };

  const WIDTH = "w-80";
  const ALIGN = "mx-auto";

  return (
    <div className={`space-y-2 ${containerClassName ?? ""}`}>
      <div className={`flex items-baseline gap-2 ${WIDTH} ${ALIGN}`}>
        <label className="text-lg font-semibold text-gray-900">사진</label>
      </div>

      {/* 업로드 박스 */}
      <div
        className={`relative ${WIDTH} h-40 rounded-2xl overflow-hidden border-2 border-black shadow-sm
          focus-within:ring-1 focus-within:ring-black/70 bg-[#FCF5E2]
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={openPicker}
        role="button"
        aria-label="사진 업로드"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            openPicker();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={onInputChange}
          disabled={disabled}
        />

        {/* 콘텐츠 영역 */}
        {showPreview && blobUrl ? (
          <img 
            src={blobUrl}
            alt="업로드 이미지 미리보기"
            className="absolute inset-0 w-full h-full object-cover w-80 h-40"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 px-4 h-full select-none">
            <span
              className="material-symbols-outlined text-[36px]"
              aria-hidden="true"
            >
              add_photo_alternate
            </span>
            <span className="text-base font-medium">사진 업로드</span>
          </div>
        )}
      </div>
    </div>
  );
}
