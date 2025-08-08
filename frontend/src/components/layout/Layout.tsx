export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // 바깥 배경: 화면 가득 + 가운데 정렬
    <div className="min-h-screen flex justify-center bg-neutral-100">
      {/* 폰 프레임: 고정 폭 393px, 높이 전체, 배경 + 그림자 */}
      <div className="w-[393px] min-h-screen bg-[#FCF5E2] shadow-xl overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
       </div>
    </div>
  );
}