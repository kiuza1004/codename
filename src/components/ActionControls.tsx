import React, { useState } from 'react';
import { Mic, MicOff, Send, SkipForward, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface ActionControlsProps {
  onSelectByWord: (word: string) => boolean;
  onPassTurn: () => void;
  onToggleVoice: () => void;
  isListening: boolean;
  voiceError: string | null;
  disabled: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  onSelectByWord,
  onPassTurn,
  onToggleVoice,
  isListening,
  voiceError,
  disabled,
}) => {
  const [inputText, setInputText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

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
    <div className="w-full bg-[#111726]/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* 음성 인식 버튼 (STT) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleVoice}
            disabled={disabled}
            className={`relative flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border shadow-lg ${
              isListening
                ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse shadow-red-500/30'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400/40 text-white hover:brightness-110 shadow-cyan-600/20'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 text-red-400 animate-bounce" />
                <span>듣고 있습니다... (말씀하세요)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
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
              placeholder={disabled ? "상대방 턴 또는 팀장 분석 중..." : "단어 직접 입력 (예: 사과, 비행기)"}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-medium"
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 rounded bg-slate-800"
              >
                지우기
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled || !inputText.trim()}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 hover:border-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">지목</span>
          </button>
        </form>

        {/* 턴 종료 (Pass) 버튼 */}
        <button
          type="button"
          onClick={onPassTurn}
          disabled={disabled}
          title="남은 지목 기회를 종료하고 상대방 턴으로 넘깁니다"
          className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 font-semibold text-sm border border-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SkipForward className="w-4 h-4 text-amber-400" />
          <span>턴 종료 (Pass)</span>
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
