import React from 'react';
import { Shield, X, Mic, Volume2, Target, AlertTriangle } from 'lucide-react';

interface RuleModalProps {
  onClose: () => void;
}

export const RuleModal: React.FC<RuleModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-[#141b2b] border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">코드네임 (Codenames) 작전 지침</h3>
            <p className="text-xs text-slate-400">스파이마스터 AI 팀장 연습 규칙</p>
          </div>
        </div>

        {/* 본문 규칙 안내 */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-2xl">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5 text-cyan-400">
              <Target className="w-4 h-4" /> 1. 게임의 목표
            </h4>
            <p>
              테이블 위의 25장 카드 중 <strong>자신의 소속 팀 요원 카드(8~9장)</strong>를 상대 팀보다 먼저 모두 찾아내면 승리합니다!
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-2xl">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5 text-emerald-400">
              <Volume2 className="w-4 h-4" /> 2. 팀장 AI의 힌트 제공
            </h4>
            <p>
              앱(AI 팀장)이 키카드를 확인하고, 아군 요원 카드들을 묶는 <strong>[단어 1개]와 [숫자]</strong>를 음성과 화면으로 제시합니다.
              <br/>
              예: <span className="text-cyan-300 font-mono font-bold">"우주 2"</span> ➔ 우주와 연관된 아군 카드가 2장 있다는 뜻입니다.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-2xl">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5 text-blue-400">
              <Mic className="w-4 h-4" /> 3. 지목 방법 (음성 & 텍스트 & 클릭)
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>음성</strong>: [말로 지목하기] 버튼을 누르고 단어를 말씀하세요 (예: "사과").</li>
              <li><strong>텍스트</strong>: 입력창에 단어를 타이핑하고 [지목]을 누르세요.</li>
              <li><strong>직접 클릭</strong>: 보드의 카드를 마우스로 바로 클릭해도 됩니다.</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-2xl">
            <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5 text-red-400">
              <AlertTriangle className="w-4 h-4" /> 4. 카드 판정 및 주의사항
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li><span className="text-emerald-400 font-bold">● 아군 요원</span>: 계속 지목 가능 (최대 힌트숫자 + 1회).</li>
              <li><span className="text-blue-400 font-bold">● 상대 요원</span>: 턴 강제 종료 + 상대팀 1점 득점.</li>
              <li><span className="text-amber-400 font-bold">● 중립 민간인</span>: 턴 강제 종료.</li>
              <li><span className="text-red-500 font-bold">● 암살자 (1장)</span>: 즉시 게임 오버 패배!</li>
            </ul>
          </div>

          <div className="bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl text-[11px] text-cyan-300 font-mono">
            💡 PWA 안내: 브라우저 캐시 문제 방지를 위해 앱 업데이트 시에는 기존 앱을 완전히 삭제 후 재설치 또는 새로고침(Ctrl+F5)을 권장합니다.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
        >
          확인 및 닫기
        </button>
      </div>
    </div>
  );
};
