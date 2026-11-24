// Web Speech API를 활용한 음성 인식(STT) 및 음성 합성(TTS)

interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export class SpeechEngine {
  private recognition: SpeechRecognitionInstance | null = null;
  public isListening: boolean = false;
  public ttsEnabled: boolean = true;

  constructor() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.lang = 'ko-KR';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 3;
        this.recognition.continuous = false;
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }

  public isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  // 음성 듣기 시작
  public startListening(
    onResult: (text: string) => void,
    onStateChange?: (listening: boolean) => void,
    onError?: (error: string) => void
  ) {
    if (!this.recognition) {
      if (onError) onError('이 브라우저는 음성 인식을 지원하지 않습니다. (Chrome, Edge 권장)');
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStateChange) onStateChange(true);
    };

    this.recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results[0][0].transcript.trim();
      onResult(transcript);
    };

    this.recognition.onerror = (e) => {
      console.warn('Speech recognition error:', e.error);
      this.isListening = false;
      if (onStateChange) onStateChange(false);
      if (onError && e.error !== 'no-speech') {
        onError(`음성 인식 오류: ${e.error}`);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onStateChange) onStateChange(false);
    };

    try {
      this.recognition.start();
    } catch (err) {
      console.error(err);
      this.isListening = false;
      if (onStateChange) onStateChange(false);
    }
  }

  // 음성 듣기 중단
  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.error(e);
      }
      this.isListening = false;
    }
  }

  // 팀장 힌트 TTS 음성 출력
  public speakHint(teamName: string, word: string, count: number) {
    if (!this.ttsEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // 이전 음성 취소

    const text = `${teamName} 팀장 힌트입니다. 단어 ${word}, ${count}장.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // 한국어 보이스 선택
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(v => v.lang.startsWith('ko'));
    if (koVoice) {
      utterance.voice = koVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // 일반 안내 TTS 음성 출력
  public speakText(text: string) {
    if (!this.ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  }

  public cancelSpeech() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speech = new SpeechEngine();
