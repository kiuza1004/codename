import React, { useState } from 'react';
import { Send, Hash, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { Hint } from '../types/game';

interface SpymasterInputBarProps {
  onSubmitHint: (word: string, count: number) => void;
  disabled: boolean;
  team: 'red' | 'blue';
  onGetAiSuggestion?: () => Hint | null;
}

export const SpymasterInputBar: React.FC<SpymasterInputBarProps> = ({
  onSubmitHint,
  disabled,
  team,
  onGetAiSuggestion,
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
    <div className={`w-full rounded-xl border px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-md transition-all ${
      isRed
        ? 'bg-red-950/70 border-red-500/60 shadow-red-950/40'
        : 'bg-blue-950/70 border-blue-500/60 shadow-blue-950/40'
    }`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`text-[11px] font-mono font-black uppercase px-2 py-0.5 rounded-md border ${
            isRed ? 'bg-red-900 border-red-400 text-white' : 'bg-blue-900 border-blue-400 text-white'
          }`}>
            {isRed ? 'RED 팀장 지령' : 'BLUE 팀장 지령'}
          </span>

          {onGetAiSuggestion && (
            <button
              type="button"
              onClick={() => {
                const suggested = onGetAiSuggestion();
                if (suggested) {
                  setWord(suggested.word);
                  setCount(suggested.count);
                  setError(null);
                }
              }}
              disabled={disabled}
              title="AI가 분석한 최적의 시맨틱 힌트를 자동으로 채웁니다"
              className="px-2 py-0.5 rounded-md bg-cyan-950/80 hover:bg-cyan-800 text-cyan-300 hover:text-white border border-cyan-500/50 text-[10px] font-mono font-bold flex items-center gap-1 transition-all disabled:opacity-40 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>AI 추천</span>
            </button>
          )}
        </div>

        {/* 단어 입력 */}
        <div className="relative flex-1 w-full">
          <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              if (error) setError(null);
            }}
            disabled={disabled}
            placeholder={disabled ? '아군 팀장 턴 대기 중...' : '암호 단어 입력 (예: 우주)'}
            maxLength={15}
            className="w-full pl-8 pr-2.5 py-1 sm:py-1.5 rounded-lg bg-slate-950/90 border border-slate-700 text-white font-spy text-xs focus:border-cyan-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* 수량 선택 (1~9장) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-slate-950/90 border border-slate-700 rounded-lg px-2 py-0.5">
            <Hash className="w-3 h-3 text-amber-400 mr-1" />
            <span className="text-[11px] font-mono text-slate-400 mr-1.5">목표:</span>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              disabled={disabled}
              className="bg-transparent text-amber-300 font-mono font-bold text-xs focus:outline-none cursor-pointer disabled:opacity-50"
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
            className={`px-3 py-1 sm:py-1.5 rounded-lg text-white font-bold font-mono text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              isRed
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 shadow-red-950/50'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 shadow-blue-950/50'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>지령 전송</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
