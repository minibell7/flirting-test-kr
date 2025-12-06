import React from 'react';
import { Sparkles, MessageCircleHeart, ArrowRight } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 animate-fade-in p-6 relative">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Main Content */}
      <div className="z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-600">당신의 연애 세포, 안녕하십니까?</span>
        </div>

        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
            실전<br />
            <span className="gradient-text">플러팅 능력고사</span>
          </h1>
          <MessageCircleHeart className="absolute -top-8 -right-4 w-12 h-12 text-pink-500 rotate-12 animate-bounce" />
        </div>

        <p className="text-gray-600 text-lg md:text-xl font-medium break-keep">
          썸부터 연애까지 마주칠 수 있는<br/>
          <span className="text-rose-500 font-bold">리얼한 위기 상황</span> 대처 능력 테스트
        </p>
      </div>

      {/* Stats Card (Fake) */}
      <div className="glass p-6 rounded-2xl w-full max-w-xs mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs text-gray-400">love_scanner.exe</span>
        </div>
        <div className="space-y-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[95%] bg-gradient-to-r from-pink-400 to-purple-500"></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>눈치력</span>
            <span>99.9%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-gradient-to-r from-blue-400 to-cyan-500"></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>플러팅 기술</span>
            <span>60.5%</span>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="group relative w-full max-w-xs mx-auto py-4 bg-gray-900 text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-black hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
      >
        테스트 시작하기
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <p className="text-xs text-gray-400">※ 결과 보고 팩폭 당할 수 있음 주의</p>
    </div>
  );
};

export default StartScreen;