import React, { useState } from 'react';
import { Send, Hash, MessageSquare, AlertCircle } from 'lucide-react';

interface SpymasterInputBarProps {
  onSubmitHint: (word: string, count: number) => void;
  disabled: boolean;
  team: 'red' | 'blue';
}

export const SpymasterInputBar: React.FC<SpymasterInputBarProps> = ({
  onSubmitHint,
  disabled,
  team,
}) => {
  const [word, setWord] = useState('');
  const [count, setCount] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    const trimmed = word.trim();
    if (!trimmed) {
      setError('암호 단어를 입력하십시오.');
      return;
    }
    if (trimmed.includes(' ')) {
      setError('코드네임 정식 규칙상 힌트는 띄어쓰기 없는 단일 단어여야 합니다.');
      return;
    }

    setError(null);
    onSubmitHint(trimmed, count);
    setWord('');
  };

  const isRed = team === 'red';

  return (
    <div className={`w-full rounded-2xl border p-3 shadow-lg transition-all ${
      isRed
        ? 'bg-red-950/70 border-red-500/60 shadow-red-950/40'
        : 'bg-blue-950/70 border-blue-500/60 shadow-blue-950/40'
    }`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded-lg border ${
            isRed ? 'bg-red-900 border-red-400 text-white' : 'bg-blue-900 border-blue-400 text-white'
          }`}>
            {isRed ? 'RED 팀장 지령실' : 'BLUE 팀장 지령실'}
          </span>
        </div>

        {/* 단어 입력 */}
        <div className="relative flex-1 w-full">
          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              if (error) setError(null);
            }}
            disabled={disabled}
            placeholder={disabled ? '아군 팀장 턴을 기다리는 중...' : '암호 단어 입력 (예: 우주, 바다)'}
            maxLength={15}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-white font-spy text-sm focus:border-cyan-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* 수량 선택 (1~9장) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-slate-950/90 border border-slate-700 rounded-xl px-2.5 py-1.5">
            <Hash className="w-3.5 h-3.5 text-amber-400 mr-1" />
            <span className="text-xs font-mono text-slate-400 mr-2">목표:</span>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              disabled={disabled}
              className="bg-transparent text-amber-300 font-mono font-bold text-sm focus:outline-none cursor-pointer disabled:opacity-50"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n} className="bg-slate-900 text-white">
                  {n}장
                </option>
              ))}
            </select>
          </div>

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={disabled || !word.trim()}
            className={`px-4 py-2 rounded-xl text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              isRed
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 shadow-red-950/50'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 shadow-blue-950/50'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>암호 힌트 전송</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-mono">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
