import React, { useState, useMemo } from 'react';
import { CardItem } from '../types/game';
import { Mic, MicOff, Send, SkipForward, AlertCircle, Sparkles, Pin } from 'lucide-react';
import { sound } from '../utils/audio';

interface ActionControlsProps {
  cards?: CardItem[];
  onSelectByWord: (word: string) => boolean;
  onPassTurn: () => void;
  onToggleVoice: () => void;
  isListening: boolean;
  voiceError: string | null;
  disabled: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  cards = [],
  onSelectByWord,
  onPassTurn,
  onToggleVoice,
  isListening,
  voiceError,
  disabled,
}) => {
  const [inputText, setInputText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // 미공개 카드 중 입력 텍스트와 매칭되는 자동완성 추천 칩 & 마킹해둔 후보 카드
  const unrevealedCards = useMemo(() => cards.filter(c => !c.revealed), [cards]);
  const markedCards = useMemo(() => unrevealedCards.filter(c => c.marked), [unrevealedCards]);

  const matchingSuggestions = useMemo(() => {
    const q = inputText.trim().replace(/\s+/g, '');
    if (!q) return [];
    return unrevealedCards.filter(c => {
      const cleanWord = c.word.replace(/\s+/g, '');
      if (cleanWord.includes(q)) return true;
      if (c.keywords && c.keywords.some(k => k.includes(q))) return true;
      return false;
    }).slice(0, 6);
  }, [inputText, unrevealedCards]);

  const handleQuickSelect = (word: string) => {
    if (disabled) return;
    sound.playHover();
    const success = onSelectByWord(word);
    if (success) {
      setInputText('');
      setFeedback(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !inputText.trim()) return;

    sound.playHover();
    const success = onSelectByWord(inputText);
    if (success) {
      setInputText('');
      setFeedback(null);
    } else {
      setFeedback(`"${inputText}" 카드를 찾을 수 없거나 이미 공개되었습니다.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#111726]/95 backdrop-blur-md border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl">
      {/* 🎯 Argon 스마트 자동완성 칩 또는 내가 마킹한 후보 빠른 지목 바 */}
      {!disabled && (matchingSuggestions.length > 0 || markedCards.length > 0) && (
        <div className="mb-2.5 pb-2 border-b border-slate-800/80 flex items-center gap-1.5 flex-wrap animate-fadeIn">
          {matchingSuggestions.length > 0 ? (
            <>
              <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3" />
                <span>빠른 지목:</span>
              </span>
              {matchingSuggestions.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleQuickSelect(c.word)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-500/40 text-xs font-bold transition-all shadow-sm"
                >
                  {c.word}
                </button>
              ))}
            </>
          ) : (
            markedCards.length > 0 && (
              <>
                <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1 mr-1">
                  <Pin className="w-3 h-3" />
                  <span>마킹한 후보 즉시 지목:</span>
                </span>
                {markedCards.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleQuickSelect(c.word)}
                    className="px-2.5 py-1 rounded-lg bg-amber-950/70 hover:bg-amber-600 text-amber-200 hover:text-white border border-amber-500/40 text-xs font-bold transition-all shadow-sm"
                  >
                    ★ {c.word}
                  </button>
                ))}
              </>
            )
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
        {/* 음성 인식 버튼 (STT) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleVoice}
            disabled={disabled}
            className={`w-full sm:w-auto relative flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border shadow-md whitespace-nowrap ${
              isListening
                ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse shadow-red-500/30'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400/40 text-white hover:brightness-110 shadow-cyan-600/20'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 animate-bounce" />
                <span>듣고 있습니다... (말씀하세요)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>말로 지목하기 (음성)</span>
              </>
            )}
          </button>
        </div>

        {/* 텍스트 입력창 (타이핑) */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={disabled}
              placeholder={disabled ? '상대방 턴 또는 팀장 분석 중...' : '단어 입력 시 자동완성 칩이 표시됩니다'}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium"
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-[11px] px-1.5 py-0.5 rounded bg-slate-800"
              >
                지우기
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled || !inputText.trim()}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>지목</span>
          </button>
        </form>

        {/* 턴 종료 (Pass) 버튼 */}
        <button
          type="button"
          onClick={onPassTurn}
          disabled={disabled}
          title="남은 지목 기회를 종료하고 상대방 턴으로 넘깁니다"
          className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          <span>턴 종료</span>
        </button>
      </div>

      {/* 피드백 및 오류 메시지 */}
      {(feedback || voiceError) && (
        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center gap-2 text-xs text-amber-400 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{feedback || voiceError}</span>
        </div>
      )}
    </div>
  );
};
