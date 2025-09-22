import { Game } from '@/types/record';

interface GameSelectModalProps {
  gameOptions: Game[];
  myTeam: string;
  onSelect: (game: Game) => void;
  onClose: () => void;
}

export function GameSelectModal({
  gameOptions,
  myTeam,
  onSelect,
  onClose
}: GameSelectModalProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/30 pt-55">

      <div className="bg-[#FCF5E2] rounded-2xl p-6 w-[90%] max-w-md space-y-4 shadow-xl border-2 border-black">
        <h2 className="text-lg font-bold text-center text-gray-900">경기를 선택하세요</h2>

        <div className="space-y-3">
          {gameOptions.map((game, idx) => (
            <button
              key={idx}
              className="w-full text-left px-4 py-3 rounded-2xl border-2 border-black hover:bg-yellow-100 transition-all"
              onClick={() => onSelect(game)}
            >
              <div className="font-semibold text-base text-black">{game.team1} vs {game.team2}</div>
              <div className="text-md text-gray-700 mt-1"> {game.score1 ?? '-'} : {game.score2 ?? '-'}</div>
            </button>
          ))}
        </div>

        <button
          className="w-full mt-4 text-sm text-red-500 hover:underline"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}