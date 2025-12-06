import React from 'react';
import { Score, ResultType } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Share2, RotateCcw, MessageCircle, ClipboardCheck, CheckCircle2 } from 'lucide-react';

interface ResultScreenProps {
  score: Score;
  resultType: ResultType;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, resultType, onRestart }) => {
  
  // Chart Data
  const chartData = [
    { subject: '직진력', A: Math.max(20, Math.min(100, score.L * 1.2)), fullMark: 100 },
    { subject: '눈치', A: Math.max(20, Math.min(100, score.E * 1.2)), fullMark: 100 },
    { subject: '매너', A: Math.max(20, Math.min(100, (score.L + score.E) / 1.5)), fullMark: 100 },
    { subject: '공감', A: Math.max(20, Math.min(100, score.E * 1.5)), fullMark: 100 },
    { subject: '유머', A: Math.max(20, Math.min(100, (score.L * 0.8 + score.E * 0.5))), fullMark: 100 },
  ];

  const getEmoji = (id: string) => {
    switch (id) {
      case 'FOX': return '🦊';
      case 'RETRIEVER': return '🐶';
      case 'RACCOON': return '🦝';
      case 'CAT': return '🐈';
      case 'BOAR': return '🐗';
      case 'RABBIT': return '🐰';
      case 'SLOTH': return '🦥';
      case 'ROCK': return '🪨';
      default: return '❓';
    }
  };

  const getGradient = (id: string) => {
    switch (id) {
      case 'FOX': return 'from-rose-400 to-pink-500';
      case 'RETRIEVER': return 'from-yellow-400 to-orange-400';
      case 'RACCOON': return 'from-indigo-400 to-blue-500';
      case 'CAT': return 'from-purple-400 to-violet-500';
      case 'BOAR': return 'from-red-500 to-orange-600';
      case 'RABBIT': return 'from-pink-300 to-rose-300';
      case 'SLOTH': return 'from-green-400 to-emerald-500';
      case 'ROCK': return 'from-gray-400 to-slate-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '실전 플러팅 능력고사',
          text: `내 연애 유형은? [${resultType.title}]\n생존점수: ${resultType.score}점`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다! (친구들에게 공유해보세요)");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in pb-10">
      
      {/* ID Card Result */}
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 relative">
        {/* Top Banner - Increased height and adjusted alignment to prevent overlapping */}
        <div className={`h-40 w-full bg-gradient-to-r ${getGradient(resultType.id)} p-6 flex flex-col items-center justify-start pt-8 text-white text-center relative`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <p className="text-xs font-medium opacity-80 mb-2 uppercase tracking-widest">Flirting Ability Test</p>
            <h1 className="text-2xl font-black break-keep leading-tight shadow-sm drop-shadow-md z-10">
              {resultType.title}
            </h1>
        </div>

        <div className="p-6 relative pt-14">
             {/* Profile Image / Avatar Placeholder */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center text-5xl overflow-hidden z-20 animate-bounce-slow">
                {getEmoji(resultType.id)}
            </div>

            <div className="text-center space-y-1 mb-6">
                <span className={`inline-block px-3 py-1 bg-gray-100 ${resultType.color} rounded-lg text-xs font-bold border border-gray-200`}>
                    생존 점수: {resultType.score}점
                </span>
                <p className="text-gray-500 text-sm font-medium">{resultType.subtitle}</p>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed text-center break-keep border border-gray-100 mb-6 shadow-inner">
                {resultType.description}
            </div>

            {/* Chart */}
            <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar
                    name="My Stats"
                    dataKey="A"
                    stroke="#ec4899"
                    fill="#ec4899"
                    fillOpacity={0.5}
                    />
                </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={handleShare}
          className="flex-1 bg-[#FEE500] text-[#191919] py-3.5 rounded-xl font-bold hover:bg-[#FDD835] transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
        >
          <MessageCircle size={18} fill="#191919" className="text-[#191919]" />
          결과 공유
        </button>
        <button 
          onClick={onRestart}
          className="flex-1 bg-white text-gray-900 border-2 border-gray-100 py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw size={18} />
          다시하기
        </button>
      </div>

      {/* Solution Section (Prescription) */}
      <div className="glass rounded-2xl p-6 border border-white/60 shadow-lg relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
             <ClipboardCheck className="w-5 h-5 text-rose-500" />
             <h3 className="font-bold text-gray-800 text-lg">연애 능력치 급상승 처방전</h3>
        </div>
        
        <div className="space-y-3 relative z-10">
          {resultType.advice.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/80 p-3 rounded-xl border border-white shadow-sm hover:scale-[1.02] transition-transform duration-200">
               <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
               <p className="text-sm text-gray-700 font-medium leading-snug break-keep">
                 {tip}
               </p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 font-medium">※ 이 처방전대로만 하면 올해 솔로 탈출 가능</p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;