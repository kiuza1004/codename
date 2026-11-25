import React, { useState, useEffect } from 'react';
import { GameArchiveRecord } from '../types/multiplayer';
import { archiveManager } from '../utils/archive';
import { History, Download, Trash2, ChevronLeft, Calendar, Shield, X, Target } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, onClose }) => {
  const [archives, setArchives] = useState<GameArchiveRecord[]>([]);
  const [selectedArchive, setSelectedArchive] = useState<GameArchiveRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setArchives(archiveManager.getArchives());
      setSelectedArchive(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('이 작전 기록을 삭제하시겠습니까?')) {
      archiveManager.deleteArchive(id);
      setArchives(archiveManager.getArchives());
      if (selectedArchive?.id === id) {
        setSelectedArchive(null);
      }
    }
  };

  const handleExport = (record: GameArchiveRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    archiveManager.exportAsJson(record);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-gradient-to-b from-[#131a2a] via-[#0f1422] to-[#0a0d18] border-2 border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95dvh]">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/30 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <span className="font-bold font-spy tracking-wider text-slate-100 text-lg">
              {selectedArchive ? '작전 정밀 복기실 (MISSION REPLAY)' : '기밀 작전 보관소 (MISSION ARCHIVES)'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 콘텐츠 */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {selectedArchive ? (
            /* 🔍 선택된 작전 상세 복기 뷰 */
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedArchive(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>목록으로 돌아가기</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleExport(selectedArchive, e)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON 내보내기</span>
                  </button>
                </div>
              </div>

              {/* 작전 요약 브리핑 */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white font-spy">{selectedArchive.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedArchive.date}</span>
                    <span>모드: {selectedArchive.mode === 'picture' ? '5×4 그림판 (20장)' : '5×5 낱말판 (25장)'}</span>
                    <span>총 턴수: {selectedArchive.totalTurns || selectedArchive.hintHistory.length}턴</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black font-mono border ${
                    selectedArchive.winner === 'red'
                      ? 'bg-red-950 text-red-300 border-red-500/60'
                      : selectedArchive.winner === 'blue'
                      ? 'bg-blue-950 text-blue-300 border-blue-500/60'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-700'
                  }`}>
                    {selectedArchive.winner === 'assassin' ? '암살자 피격 (패배)' : `${selectedArchive.winner.toUpperCase()} 팀 승리!`}
                  </span>
                </div>
              </div>

              {/* 1. 기밀 키카드 전체 복기 보드 (25장/20장) */}
              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-300 mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> 당시 전술 키카드 맵 원본 복기
                </h4>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {selectedArchive.cards.map((card, idx) => {
                    let bgClass = 'bg-slate-800 border-slate-700 text-slate-300';
                    if (card.type === 'red') bgClass = 'bg-red-950/90 border-red-500 text-red-200';
                    if (card.type === 'blue') bgClass = 'bg-blue-950/90 border-blue-500 text-blue-200';
                    if (card.type === 'neutral') bgClass = 'bg-amber-950/40 border-amber-500/40 text-amber-200';
                    if (card.type === 'assassin') bgClass = 'bg-black border-red-600 text-red-400 font-black';

                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl border text-center flex flex-col justify-center items-center min-h-[56px] text-xs font-bold transition-all relative ${bgClass}`}
                      >
                        {card.revealed && (
                          <span className="absolute top-1 right-1 text-[8px] px-1 rounded bg-black/60 text-emerald-400 font-mono">
                            확보됨
                          </span>
                        )}
                        <span className="truncate w-full">{card.word}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. 턴별 힌트 및 유도 타깃 복기 히스토리 */}
              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-300 mb-2 flex items-center gap-1.5">
                  <History className="w-4 h-4" /> 턴별 작전 힌트 & 유도 타깃 카드 복기
                </h4>
                <div className="flex flex-col gap-2.5">
                  {selectedArchive.hintHistory.length > 0 ? (
                    selectedArchive.hintHistory.map((h, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col gap-2 text-xs font-mono shadow-sm"
                      >
                        {/* 힌트 단어 & 장수 & 확신도 */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-slate-500 font-bold">#{i + 1}턴</span>
                            <span className="text-base font-black text-cyan-300 font-spy px-2.5 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40">
                              "{h.word}"
                            </span>
                            <span className="px-2 py-0.5 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-300 font-black">
                              {h.count}장
                            </span>
                          </div>
                          {h.confidence && (
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                              AI 확신도 {h.confidence}%
                            </span>
                          )}
                        </div>

                        {/* 🎯 힌트가 유도한 목표 카드 단어들 (핵심 요구사항 반영) */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-0.5">
                          <span className="text-slate-400 font-bold flex items-center gap-1">
                            <Target className="w-3.5 h-3.5 text-cyan-400" />
                            <span>팀장 유도 타깃:</span>
                          </span>
                          {h.targetWords && h.targetWords.length > 0 ? (
                            h.targetWords.map((tw, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-cyan-950/90 text-cyan-200 border border-cyan-400/50 font-bold text-xs"
                              >
                                {tw}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 italic">유도 정보 없음</span>
                          )}
                        </div>

                        {/* 상세 해설 텍스트 */}
                        {h.explanation && (
                          <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 leading-relaxed mt-0.5">
                            💡 {h.explanation}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 font-mono py-2">기록된 힌트 없음</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* 📋 저장된 아카이브 목록 뷰 */
            <div>
              {archives.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center justify-center gap-3">
                  <History className="w-12 h-12 text-slate-600 animate-pulse" />
                  <p className="text-slate-400 text-sm font-mono">아직 저장된 작전 기록이 없습니다.</p>
                  <p className="text-slate-500 text-xs">게임이 종료되면 자동으로 이곳에 기밀 작전이 아카이브됩니다.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {archives.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => setSelectedArchive(rec)}
                      className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-[#121929] cursor-pointer transition-all flex flex-wrap items-center justify-between gap-3 shadow-md group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-black text-xs font-mono ${
                          rec.winner === 'red'
                            ? 'bg-red-950 border-red-500 text-red-300'
                            : rec.winner === 'blue'
                            ? 'bg-blue-950 border-blue-500 text-blue-300'
                            : 'bg-black border-red-700 text-red-500'
                        }`}>
                          {rec.winner === 'assassin' ? 'FAIL' : rec.winner.toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-spy">
                            {rec.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                            <span>{rec.date}</span>
                            <span>·</span>
                            <span>{rec.mode === 'picture' ? '그림(20장)' : '낱말(25장)'}</span>
                            <span>·</span>
                            <span>{rec.hintHistory.length}개 힌트</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleExport(rec, e)}
                          title="JSON 파일 다운로드"
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(rec.id, e)}
                          title="기록 삭제"
                          className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 group-hover:bg-cyan-800/90 text-cyan-300 group-hover:text-white border border-cyan-500/40 text-xs font-mono font-bold transition-all"
                        >
                          복기하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
